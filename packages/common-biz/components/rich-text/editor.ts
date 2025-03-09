import 'katex/dist/katex.min.css';
import '@textbus/xnote/bundles/index.css';
import { Editor, FileUploader, HighlightBoxComponent, ImageComponent } from '@textbus/xnote';
import { merge } from 'lodash-es';
import { Commander, Component, ContentType } from '@textbus/core';
import { Injectable } from '@viewfly/core';
import { openSelectFile, uploadBase64 } from './utils';
import type { SelectFileProps } from './utils';
import type { ComponentLoader } from '@textbus/platform-browser';
import type { Adapter, Registry, RootComponentRef, Selection, Slot, Textbus } from '@textbus/core';
import type { FileItem } from '@erp/common';
import type { EditorConfig } from '@textbus/xnote';

@Injectable()
class CustomCommander extends Commander {
	fileUpload: SelectFileProps;
	constructor(selection: Selection, adapter: Adapter, textbus: Textbus, registry: Registry, rootComponentRef: RootComponentRef) {
		super(selection, adapter, textbus, registry, rootComponentRef);
		console.log(textbus.config);
		this.fileUpload = (textbus.config as any).fileUpload;
	}
	paste(slot: Slot, text: string) {
		slot.sliceContent().forEach(content => {
			if (content instanceof ImageComponent) {
				if (/^https?:\/\//.test(content.state.src)) {
					// 啥都不用做
				} else {
					uploadBase64(
						content.state.src,
						src => {
							content.state.src = src;
						},
						this.fileUpload,
					);
				}
			}
		});
		// 待图片转换完成后，可调用超类的 paste 方法
		super.paste(slot, text);
		return true;
	}

	insert(content: any, formatter?: any, value?: any): boolean {
		return super.insert(content, formatter, value);
	}
}

class CustomFileUploader extends FileUploader {
	props: SelectFileProps;
	constructor(props: SelectFileProps) {
		super();
		this.props = props;
	}
	uploadFile(type: string): string | string[] | Promise<string | string[]> {
		return openSelectFile(
			merge(
				{
					action: '/api/system/upload',
					name: 'files',
					accept: type,
					autoUpload: true,
					responseUrlKey: 'data.path',
					multiple: true,
				},
				this.props,
			),
		).then((res: FileItem | FileItem[]) => {
			if (Array.isArray(res)) {
				return res.map(v => v.url);
			}
			return res.url;
		});
	}
}

export function createEditor(el: HTMLElement, config?: EditorConfig & { fileUpload?: SelectFileProps }) {
	config = merge(
		{
			providers: [
				{
					provide: FileUploader,
					useFactory() {
						return new CustomFileUploader(config.fileUpload);
					},
				},
				{
					provide: Commander,
					useClass: CustomCommander,
				},
			],
			formatters: [],
			beforeEach(textbus) {
				console.log('textbus >>', textbus);
			},
		} as EditorConfig,
		config,
	);
	const editor = new Editor(config);
	return editor.mount(el).then(e => {
		console.log('编辑器准备完成。');
		return e;
	});
}

class VideoComponent extends Component {
	static fromJSON(textbus, json) {
		return new VideoComponent(textbus, Object.assign({}, json));
	}
	getSlots() {
		return [];
	}
	static type = ContentType.InlineComponent;
	static componentName = 'VideoComponent';
}

HighlightBoxComponent.defaultTypes = [' ', '❤️', '💡', '📌', '✅', '❎', '👍', '🎉', '🚫', '❗'];

const videoComponentLoader: ComponentLoader = {
	match(element: HTMLElement) {
		return element.tagName === 'VIDEO' || element.dataset.component === VideoComponent.componentName;
	},
	read(element: HTMLElement, textbus: Textbus) {
		const video = element instanceof HTMLVideoElement ? element : element.querySelector('video') || document.createElement('video');
		return new VideoComponent(textbus, {
			src: video.src,
			width: video.style.width || 'auto',
			height: video.style.height || 'auto',
			controls: true,
		});
	},
};
