import type { FileItem } from '@erp/common';

/**
 * @zh 导入excel组件
 */
export interface ImportExcelProps {
	bizName?: string;
	tips?: string;
	uploadTips?: string;
	downloadUrl?: string;
	beforeConfirm?: (url: FileItem) => Promise<boolean>;
}
