import type { VxeTableDefines } from '..';

export namespace VxeGlobalFormatsHandles {
	export interface FormatsOptions {
		/**
		 * 表格 - 自定义单元格格式化方法
		 */
		tableCellFormatMethod?: (params: TableCellFormatMethodParams, ...args: any[]) => string | number;
		/**
		 * 表格 - 自定义表尾单元格格式化方法
		 */
		tableFooterCellFormatMethod?: (params: TableFooterCellFormatMethodParams, ...args: any[]) => string | number;
	}
	export interface TableCellFormatMethodParams {
		cellValue: any;
		row: any;
		column: VxeTableDefines.ColumnInfo;
	}
	export interface TableFooterCellFormatMethodParams {
		itemValue: any;
		column: VxeTableDefines.ColumnInfo;
		row: any;
		items: any[];
		_columnIndex: number;
	}
}

/**
 * 全局格式化
 */
export interface VxeGlobalFormats {
	mixin(opts: { [name: string]: VxeGlobalFormatsHandles.FormatsOptions | ((params: any, ...args: any[]) => string | number) }): VxeGlobalFormats;
	has(name: string): boolean;
	get(name: string): VxeGlobalFormatsHandles.FormatsOptions;
	add(name: string, options: VxeGlobalFormatsHandles.FormatsOptions | ((params: any, ...args: any[]) => string | number)): VxeGlobalFormats;
	delete(name: string): void;
	forEach(callback: (options: VxeGlobalFormatsHandles.FormatsOptions, name: string) => void): void;
}
