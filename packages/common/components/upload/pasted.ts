import Modal from '../modal';
import Message from '../message';
import { checkElInView, getParentScroller } from '../_utils/dom';
import { loopDirectory } from './utils';

type Listener = (files: File[] | FileList) => void;

type ListenerType = { listener: Listener; el: HTMLElement };

/**
 * 复制粘贴管理类
 */
export class PastedFile {
	private static instance: PastedFile;

	private listeners: ListenerType[] = [];

	private hasReadFiles: Set<string> = new Set();

	private hiddenProperty = ('hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden').replace(
		/hidden/i,
		'visibilitychange',
	);

	private hasTip = false;

	private constructor() {
		this.pasted = this.pasted.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onDragenter = this.onDragenter.bind(this);
		this.onDragover = this.onDragover.bind(this);
		this.onDragleave = this.onDragleave.bind(this);
		const activated = this.activated.bind(this);
		let timeoutId;
		this.activated = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				activated();
			}, 100);
		};
	}
	private init() {
		document.addEventListener('paste', this.pasted);
		document.addEventListener(this.hiddenProperty, this.activated);
		document.addEventListener('focused', this.activated);
		return this;
	}

	addEventListener(listener: Listener, el: HTMLElement) {
		this.removeEventListener(listener);
		this.listeners.unshift({ el, listener });
		if (el && el.hasAttribute('draggable')) {
			el.addEventListener('dragenter', this.onDragenter);
			el.addEventListener('drop', this.onDrop);
			el.addEventListener('dragover', this.onDragover);
			el.addEventListener('dragleave', this.onDragleave);
		}
	}

	private onDragenter(evt: DragEvent) {
		evt.preventDefault();
		this.setDragging(evt, true);
	}

	private onDrop(evt: DragEvent) {
		evt.preventDefault();
		if (evt.dataTransfer?.items) {
			loopDirectory(evt.dataTransfer.items, null, files => {
				this.trigger(files);
			});
		} else {
			this.trigger(evt.dataTransfer?.files);
		}
		this.setDragging(evt, false);
	}

	private onDragover(evt: DragEvent) {
		evt.preventDefault();
		this.setDragging(evt, true);
	}

	private onDragleave(evt: DragEvent) {
		evt.preventDefault();
		this.setDragging(evt, false);
	}

	private setDragging(evt: DragEvent, isDragging: boolean) {
		const target = evt.target as HTMLElement;
		if (target) {
			const clazz = 'drag-active';
			if (isDragging) {
				if (!target.classList.contains(clazz)) {
					target.classList.add(clazz);
				}
			} else {
				target.classList.remove(clazz);
			}
		}
	}

	removeEventListener(listener) {
		for (let i = 0; i < this.listeners.length; i++) {
			const item = this.listeners[i];
			if (item.listener === listener) {
				if (item.el) {
					const el = item.el;
					if (el && el.hasAttribute('draggable')) {
						el.removeEventListener('dragenter', this.onDragenter);
						el.removeEventListener('drag', this.onDrop);
						el.removeEventListener('dragover', this.onDragover);
						el.removeEventListener('dragleave', this.onDragleave);
					}
				}
				this.listeners.splice(i, 1);
			}
		}
	}

	destroyed() {
		document.removeEventListener('paste', this.pasted);
		document.removeEventListener(this.hiddenProperty, this.activated);
		document.removeEventListener('focused', this.activated);
	}

	private pasted(ev: ClipboardEvent) {
		const target = ev.target as HTMLElement;
		const files = ev.clipboardData.files;
		if (target && ['INPUT', 'TEXTAREA'].includes(target.nodeName) && document.activeElement === target) {
			return;
		}
		const lastListener = this.getLastListener();
		if (!lastListener) return;
		if (files.length === 0) {
			Message.warning('粘贴文件不能为空');
			return;
		}
		this.trigger(files);
	}

	private trigger(files) {
		if (this.listeners.length == 0) {
			return;
		}
		const lastListener = this.getLastListener();

		lastListener?.listener(Array.from(files));
	}

	/**
	 * 获取 focus DOM
	 * @returns
	 */
	private getLastListener() {
		const focusListener = this.listeners.find(v => {
			return v.el && (document.activeElement === v.el || v.el.contains(document.activeElement));
		});
		if (focusListener) {
			return focusListener;
		}
		if (document.activeElement === document.body) {
			const inViewListener = this.listeners.find(l => {
				return l.el && checkElInView(l.el, getParentScroller(l.el));
			});
			if (inViewListener) {
				return inViewListener;
			}
		}
		return null;
	}

	private activated(ev: Event) {
		const _self = this;
		const lastListener = this.getLastListener();
		if (!lastListener) {
			return;
		}
		if (document[this.hiddenProperty]) {
			console.log('窗口非活动');
		} else {
			console.log('窗口活动');
			navigator.clipboard
				.read()
				.then(async clipboardItems => {
					if (clipboardItems.length) {
						const files: File[] = [];
						const imagesTypes = ['image/png', 'image/jpeg'];
						for (const item of clipboardItems) {
							const type = item.types.find(v => imagesTypes.includes(v));
							if (type) {
								const blob = await item.getType(type);
								const hash = `${blob.size}_${await blob.slice(blob.size - 100, blob.size).text()}`;
								console.log('hash >>', hash);
								if (this.hasReadFiles.has(hash)) {
									continue;
								}
								this.hasReadFiles.add(hash);
								files.push(new File([blob], type.replace('/', '.'), { type }));
							}
						}
						if (files.length > 0) {
							if (_self.hasTip) return;
							_self.hasTip = true;
							Modal.confirm({
								title: '温馨提示',
								content: '检测到剪切板有图片，是否需要上传？',
								maskClosable: false,
								onOk(e) {
									lastListener.listener(files);
								},
								onCancel(e) {},
								onClose() {
									_self.hasTip = false;
								},
							});
						}
					}
				})
				.catch(res => {
					console.log('请求粘贴权限错误 >>', res);
				});
		}
		console.log('activated', ev);
	}

	static getInstance() {
		if (!PastedFile.instance) {
			PastedFile.instance = new PastedFile().init();
		}
		return PastedFile.instance;
	}

	static addEventListener(listener: Listener, el: HTMLElement) {
		PastedFile.getInstance().addEventListener(listener, el);
	}

	static removeEventListener(listener: Listener) {
		PastedFile.getInstance().removeEventListener(listener);
	}
}
