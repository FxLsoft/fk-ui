import { addClass, removeClass } from '../grid-table/ui/src/dom';
import { pop } from '../components';

/**
 * 动态加载脚本文件, 返回一个promise
 * @param url 加载的script的路径
 * @param attr 生成script标签时的属性
 * @returns Promise
 */
export function loadScript(url, attr?) {
	if (import.meta.env.SSR) {
		return;
	}
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.onload = function () {
			resolve(true);
		};
		script.src = url;
		script.onerror = reject;
		if (Object.prototype.toString.apply(attr) === '[object Object]') {
			for (const i in attr) {
				script.setAttribute(i, attr[i]);
			}
		}
		document.querySelectorAll('head')[0].appendChild(script);
	});
}

/**
 * 格式对象为url query 模式
 * @param obj
 * @returns String
 */
export function parseUrlParam(obj: object) {
	const url: string[] = [];
	for (const key in obj) {
		url.push(`${key}=${encodeURIComponent(obj[key])}`);
	}
	return url.join('&');
}
/**
 *  根据name获取当前url对应的参数
 *  url = '&key=value' => value
 *  默认值为defaultValue
 */
export function getUrlParam(name, url?: string) {
	if (import.meta.env.SSR) {
		return;
	}
	if (!name) return null;
	const search = url || document.location.href;
	const pattern = new RegExp(`[?&]${name}=([^&]*)`, 'g');
	const matcher = pattern.exec(search);
	let param: string | null = null;
	if (null !== matcher) {
		try {
			param = decodeURIComponent(decodeURIComponent(matcher[1]));
		} catch {
			try {
				param = decodeURIComponent(matcher[1]);
			} catch {
				param = matcher[1];
			}
		}
	}
	return param;
}

/**
 * 获取url参数，返回参数集合
 * @param url 默认为 location.search
 * @returns
 */
export function getUrlParamObject(url?: string) {
	url = url || location.href || '';
	const out = {};
	const regex = /([^?=&]+)=([^?=&]*)/g;
	let mather;
	while ((mather = regex.exec(url))) {
		let value = mather[2];
		try {
			value = decodeURIComponent(decodeURIComponent(value));
		} catch {
			try {
				value = decodeURIComponent(value);
			} catch {}
		}
		out[mather[1]] = value;
	}
	return out;
}

export function loadCss(src: string) {
	if (import.meta.env.SSR) {
		return;
	}
	return new Promise((resolve, reject) => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = src;
		link.onload = resolve;
		link.onerror = reject;
		document.head.appendChild(link);
	});
}

/**
 * 通用的拖拽
 * @param handle 拖拽点
 * @param callback 拖拽回调
 * @returns
 */
export function getDraggableProps(handle: string, callback: (from: HTMLElement, to: HTMLElement) => void) {
	let fromEl: HTMLElement;
	let toEl: HTMLElement;
	const draggableListener = (evt: DragEvent) => {
		const target = evt.currentTarget as HTMLElement;
		switch (evt.type) {
			case 'dragstart':
				evt.stopPropagation();
				fromEl = target;
				try {
					evt.dataTransfer?.setData('text/plain', '');
				} catch {}
				addClass(fromEl, 'drag-from');
				break;
			case 'dragover':
				evt.stopPropagation();
				evt.preventDefault();
				if (target !== fromEl) {
					if (toEl) {
						removeClass(toEl, 'drag-to');
					}
					addClass(target, 'drag-to');
					toEl = target;
				}
				break;
			case 'dragleave':
				evt.stopPropagation();
				break;
			case 'drag':
				evt.stopPropagation();
				evt.preventDefault();
				break;
			case 'dragend':
				evt.stopPropagation();
				if (fromEl && toEl) {
					removeClass(fromEl, 'drag-from');
					removeClass(toEl, 'drag-to');
					callback(fromEl, toEl);
				}
				fromEl = null;
				toEl = null;
				break;
		}
	};

	const onMousedown = (evt: MouseEvent) => {
		const current = evt.currentTarget as HTMLElement;
		const target = evt.target as HTMLElement;
		if (handle) {
			const handleEl = current.querySelector(handle);
			if (!(target === handleEl || target.contains(handleEl))) {
				return;
			}
		}

		current.draggable = true;
		const mouseup = (ev: MouseEvent) => {
			current.draggable = false;
			document.removeEventListener('mouseup', mouseup);
		};
		document.addEventListener('mouseup', mouseup);
	};

	return {
		onDragstart: draggableListener,
		onDragend: draggableListener,
		onDragover: draggableListener,
		onDragleave: draggableListener,
		onDrag: draggableListener,
		onMousedown,
	};
}

/** 下载文件
 * @param url 文件地址
 * @param fileName
 */
export const downloadImageByUrl = (url: string, fileName?: string) => {
	fetch(url, {
		mode: 'cors',
	})
		.then(response => {
			url = response.url;
			return response.blob();
		})
		.then(blob => {
			if (!fileName) {
				const targetUrl = new URL(url);
				fileName = targetUrl.pathname.split('/').pop() || 'downloaded-file';
			}
			const blobURL = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = blobURL;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(blobURL);
			pop.success('下载成功');
		})
		.catch(error => {
			pop.error(`下载失败：【${error}】`);
		});
};

/**
 * 复制文件
 * @param url 文件地址
 * */
export const copyImageByUrl = async (url: string) => {
	try {
		const response = await fetch(url, {
			mode: 'cors',
		});
		const blob = await response.blob();
		await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
		pop.success('图片已复制到剪贴板');
	} catch (error) {
		pop.error(`复制失败：【${error}】`);
	}
};

/**
 * 生成4位ID
 * @returns
 */
export function s4() {
	return Math.trunc((1 + Math.random()) * 0x10000)
		.toString(16)
		.slice(1);
}

/**
 * 生成8位ID
 * @returns
 */
export function s8() {
	return s4() + s4();
}

/**
 *  获取视频封面
 * @param str
 */
export function getVideoPoster(str) {
	const url = new URL(str);
	return url.protocol === 'data:' ? str : `${url.protocol}//${url.host}${url.pathname}?x-oss-process=video/snapshot,t_0,f_jpg,m_fast`;
}

/**
 * 获取文件后缀
 * @param url
 * @returns
 */
export function getFileExtension(url: string) {
	// 通过 URL 对象解析 URL
	const urlObj = new URL(url, location.origin);

	// 获取路径名
	const pathname = urlObj.pathname;

	// 使用 split 方法获取文件后缀
	const parts = pathname.split('.');

	// 如果路径中有后缀名，返回最后一个部分
	if (parts.length > 1) {
		return parts[parts.length - 1].toLocaleLowerCase();
	}

	// 如果没有后缀名，返回空字符串
	return '';
}
