export namespace VxeGlobalValidatorsHandles {
	export interface ValidatorsOptions {
		/**
		 * 表单 - 自定义表单项校验方法
		 */
		formItemValidatorMethod?: FormItemValidatorMethod;

		/**
		 * 表格 - 自定义单元格校验方法
		 */
		tableCellValidatorMethod?: TableCellValidatorMethod;
	}
}

/**
 * 全局快捷菜单
 */
export interface VxeGlobalValidators {
	mixin(options: { [code: string]: VxeGlobalValidatorsHandles.ValidatorsOptions }): VxeGlobalValidators;
	has(code: string): boolean;
	get(code: string): VxeGlobalValidatorsHandles.ValidatorsOptions;
	add(code: string, callback: VxeGlobalValidatorsHandles.ValidatorsOptions): VxeGlobalValidators;
	delete(code: string): void;
	forEach(callback: (options: VxeGlobalValidatorsHandles.ValidatorsOptions, code: string) => void): void;
}
