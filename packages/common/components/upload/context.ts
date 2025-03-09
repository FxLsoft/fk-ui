import type { CustomIcon, FileItem, ListType } from './interfaces';
import type { InjectionKey, Slots } from 'vue';

export interface UploadContext {
	listType?: ListType;
	disabled?: boolean;
	iconCls?: string;
	customIcon?: CustomIcon;
	showRemoveButton?: boolean;
	showRetryButton?: boolean;
	showReuploadButton?: boolean;
	showCancelButton?: boolean;
	showPreviewButton?: boolean;
	showPictureName?: boolean;
	showLink?: boolean;
	imageLoading?: 'eager' | 'lazy';
	download?: boolean;
	slots: Slots;
	onRemove: (fileItem: FileItem) => void;
	onAbort: (fileItem: FileItem) => void;
	onUpload: (fileItem: FileItem) => void;
	onReupload: (fileItem: FileItem) => void;
	onPreview: (fileItem: FileItem) => void;
}

export const uploadInjectionKey: InjectionKey<UploadContext> = Symbol('Fk_Upload');
