import type { FileItem } from '@erp/common';

/**
 * @zh 商品上传组件数据类型
 */
export type ShopUploadItem = FileItem | FileItem[] | string | string[];

/**
 * @zh 图片预览类型
 */
export enum ImageViewType {
	'view',
	'hover',
	'preview',
}
