export interface VxeGlobalClipboardCopyObj {
	text: string;
	html: string;
}

/**
 * 全局剪贴板
 */
export interface VxeGlobalClipboard {
	getStore(): VxeGlobalClipboardCopyObj;
	setStore(data: VxeGlobalClipboardCopyObj): void;
	copy(content: string | number | VxeGlobalClipboardCopyObj): boolean;
}
