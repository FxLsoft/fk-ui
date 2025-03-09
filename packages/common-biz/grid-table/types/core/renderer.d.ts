import type { VxeComponentClassNameType, VxeComponentSlotType, VxeComponentStyleType } from '..';
import type { VxeTableConstructor, VxeTableDefines, VxeTablePrivateMethods, VxeTablePropTypes } from '../components/table';
import type { VxeGridConstructor } from '../components/grid';
import type { VxeColumnPropTypes } from '../components/column';
import type { VxeToolbarPropTypes } from '../components/toolbar';

/**
 * 渲染器
 */
export interface VxeGlobalRenderer {
	mixin(options: Record<string, VxeGlobalRendererOptions>): VxeGlobalRenderer;
	get(name: string | null | undefined): VxeGlobalRendererOptions;
	add(name: string, options: VxeGlobalRendererOptions): VxeGlobalRenderer;
	forEach(callback: (item: VxeGlobalRendererOptions, name: string, renderMap: Record<string, VxeGlobalRendererOptions>) => void): VxeGlobalRenderer;
	delete(name: string): void;
}

export namespace VxeGlobalRendererHandles {
	export interface RenderTableFilterOptions extends VxeColumnPropTypes.FilterRender {}

	export interface RenderParams {}
	export interface RenderTableFilterParams<D = any> {
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
		$panel: any;
		column: {
			filters: VxeTableDefines.FilterOption[];
		} & VxeTableDefines.ColumnInfo<D>;
		columnIndex: number;
		$columnIndex: number;
		$rowIndex: number;
	}
	export interface TableFilterMethodParams<D = any> {
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
		value: any;
		option: VxeTableDefines.FilterOption;
		cellValue: any;
		row: any;
		column: VxeTableDefines.ColumnInfo<D>;
	}
	export interface TableFilterRemoteMethod<D = any> extends VxeTableDefines.FilterChangeParams<D> {
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
	}
	export interface TableFilterResetMethodParams<D = any> {
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
		options: VxeTableDefines.FilterOption[];
		column: VxeTableDefines.ColumnInfo<D>;
	}
	export interface TableFilterRecoverMethodParams<D = any> {
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
		option: VxeTableDefines.FilterOption;
		column: VxeTableDefines.ColumnInfo<D>;
	}

	export interface RenderTableHeaderOptions extends VxeGlobalRendererHandles.RenderOptions {}

	export interface RenderHeaderParams<D = any> extends RenderTableHeaderParams<D> {}
	export interface RenderTableHeaderParams<D = any> {
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
		column: VxeTableDefines.ColumnInfo<D>;
		columnIndex: number;
		$columnIndex: number;
		$rowIndex: number;
	}

	export interface RenderDefaultOptions<D = any> extends RenderTableDefaultOptions<D> {}
	export interface RenderTableDefaultOptions<D = any> extends VxeColumnPropTypes.CellRender<D> {}

	export interface RenderTableDefaultParams<D = any> extends RenderTableEditParams<D> {}

	export interface RenderTableFooterOptions extends VxeGlobalRendererHandles.RenderOptions {}
	export interface RenderTableFooterParams<D = any> {
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
		column: VxeTableDefines.ColumnInfo<D>;
		columnIndex: number;
		_columnIndex: number;
		$columnIndex: number;
		$rowIndex: number;
		items: any[];
		data: D[][];
	}

	export interface ExportMethodParams<D = any> extends TableExportMethodParams<D> {}
	export interface TableExportMethodParams<D = any> {
		row: D;
		column: VxeTableDefines.ColumnInfo<D>;
		options: VxeTablePropTypes.ExportHandleOptions;
	}

	export interface FooterExportMethodParams<D = any> extends TableFooterExportMethodParams<D> {}
	export interface TableFooterExportMethodParams<D = any> {
		items: any[];
		_columnIndex: number;
		column: VxeTableDefines.ColumnInfo<D>;
		options: VxeTablePropTypes.ExportHandleOptions;
	}

	export interface RenderTableEditOptions<D = any, P = any> extends VxeColumnPropTypes.EditRender<D, P> {}
	export interface RenderTableEditParams<D = any> {
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
		$grid: VxeGridConstructor<D> | null;
		column: VxeTableDefines.ColumnInfo<D>;
		columnIndex: number;
		$columnIndex: number;
		rowid: string;
		row: D;
		rowIndex: number;
		$rowIndex: number;
		isHidden: boolean;
		fixed: VxeColumnPropTypes.Fixed;
		type: string;
	}

	export interface RenderTableCellOptions<D = any, P = any> extends VxeColumnPropTypes.CellRender<D, P> {}

	export interface RenderTableCellParams<D = any> {
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
		$grid: VxeGridConstructor<D> | null;
		column: VxeTableDefines.ColumnInfo<D>;
		columnIndex: number;
		$columnIndex: number;
		rowid: string;
		row: D;
		rowIndex: number;
		$rowIndex: number;
		isHidden: boolean;
		fixed: VxeColumnPropTypes.Fixed;
		type: string;
	}

	export interface RenderTableExpandOptions extends VxeColumnPropTypes.ContentRender {}

	export interface RenderTableExpandParams<D = any> extends RenderTableEditParams<D> {}

	export type RenderTableEmptyOptions = VxeTablePropTypes.EmptyRender;
	export interface RenderTableEmptyParams<D = any> {
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
	}

	/**
	 * 渲染选项
	 */
	export interface RenderOptions {
		/**
		 * 渲染器名称
		 */
		name?: string;
		/**
		 * 目标组件渲染的参数
		 */
		props?: { [key: string]: any };
		/**
		 * 目标组件渲染的属性
		 */
		attrs?: { [key: string]: any };
		/**
		 * 目标组件渲染的事件
		 */
		events?: { [key: string]: (...args: any[]) => any };
		/**
		 * 多目标渲染
		 */
		children?: any[];
		/**
		 * 渲染类型
		 */
		cellType?: VxeColumnPropTypes.CellType;
	}

	/**
	 * 选项参数
	 */
	export interface RenderOptionProps {
		value?: string;
		label?: string;
		disabled?: string;
		key?: string;
	}

	/**
	 * 分组选项参数
	 */
	export interface RenderOptionGroupProps {
		options?: string;
		label?: string;
		key?: string;
	}
}

export namespace VxeGlobalRendererHandles {
	export interface RenderButtonOptions extends VxeToolbarPropTypes.ButtonRender {}
	export interface RenderButtonParams<D = any> {
		$grid: VxeGridConstructor | null;
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
		button: VxeToolbarPropTypes.ButtonConfig;
	}

	export interface RenderToolOptions extends VxeToolbarPropTypes.ToolRender {}
	export interface RenderToolParams<D = any> {
		$grid: VxeGridConstructor | null;
		$table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>;
		tool: VxeToolbarPropTypes.ToolConfig;
	}
}

// 表单
export interface VxeGlobalRendererOptions {
	// 表格
	/**
	 * 表格 - 设置筛选容器 class
	 */
	tableFilterClassName?: string | ((params: VxeGlobalRendererHandles.RenderTableFilterParams<any>) => string | VxeComponentClassNameType);
	/**
	 * 表格 - 筛选容器是否显示尾部
	 */
	showTableFilterFooter?: boolean;
	/**
	 * 表格 - 自定义筛选渲染内容
	 */
	renderTableFilter?(
		renderOpts: VxeGlobalRendererHandles.RenderTableFilterOptions,
		params: VxeGlobalRendererHandles.RenderTableFilterParams<any>,
	): VxeComponentSlotType | VxeComponentSlotType[];
	/**
	 * 表格 - 自定义筛选逻辑方法
	 */
	tableFilterMethod?(params: VxeGlobalRendererHandles.TableFilterMethodParams<any>): boolean;

	/**
	 * 表格行 - 自定义筛选渲染内容
	 * @param params
	 */
	renderTableHeaderFilter?(
		renderOpts: VxeGlobalRendererHandles.RenderTableFilterOptions,
		params: VxeGlobalRendererHandles.RenderTableFilterParams<any>,
	): VxeComponentSlotType | VxeComponentSlotType[];
	/**
	 * 表格 - 自定义筛选远程逻辑方法
	 */
	tableFilterRemoteMethod?(params: VxeGlobalRendererHandles.TableFilterRemoteMethod<any>): boolean;
	/**
	 * 表格 - 自定义筛选重置逻辑方法
	 */
	tableFilterResetMethod?(params: VxeGlobalRendererHandles.TableFilterResetMethodParams<any>): void;
	/**
	 * 表格 - 自定义筛选还原逻辑方法
	 */
	tableFilterRecoverMethod?(params: VxeGlobalRendererHandles.TableFilterRecoverMethodParams<any>): void;
	/**
	 * 表格 - 默认筛选处理方法，如果同时存在，会被 tableFilterMethod 覆盖
	 */
	tableFilterDefaultMethod?(params: VxeGlobalRendererHandles.TableFilterMethodParams<any>): boolean;

	/**
	 * 表格 - 默认筛选处理方法，如果同时存在，会被 tableFilterMethod 覆盖
	 */
	tableHeaderFilterDefaultMethod?(params: VxeGlobalRendererHandles.TableFilterMethodParams<any>): boolean;

	/**
	 * 表格 - 单元格设置 class
	 */
	tableCellClassName?: string | ((params: VxeGlobalRendererHandles.RenderTableDefaultParams<any>) => string | VxeComponentClassNameType);
	/**
	 * 表格 - 单元格设置样式
	 */
	tableCellStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderTableDefaultParams<any>) => VxeComponentStyleType);
	/**
	 * 表格 - 渲染头部
	 */
	renderTableHeader?(
		renderOpts: VxeGlobalRendererHandles.RenderTableHeaderOptions,
		params: VxeGlobalRendererHandles.RenderTableHeaderParams<any>,
	): VxeComponentSlotType | VxeComponentSlotType[];
	/**
	 * 表格 - 渲染单元格
	 */
	renderTableDefault?(
		renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions,
		params: VxeGlobalRendererHandles.RenderTableDefaultParams<any>,
	): VxeComponentSlotType | VxeComponentSlotType[];
	/**
	 * 表格 - 渲染尾部
	 */
	renderTableFooter?(
		renderOpts: VxeGlobalRendererHandles.RenderTableFooterOptions,
		params: VxeGlobalRendererHandles.RenderTableFooterParams<any>,
	): VxeComponentSlotType | VxeComponentSlotType[];
	/**
	 * 表格 - 自定义单元格导出逻辑
	 */
	tableExportMethod?(params: VxeGlobalRendererHandles.TableExportMethodParams<any>): string;
	/**
	 * 表格 - 自定义表尾单元格导出逻辑
	 */
	tableFooterExportMethod?(params: VxeGlobalRendererHandles.TableFooterExportMethodParams<any>): string;

	/**
	 * 表格 - 激活编辑状态时，设置自动聚焦的 class
	 */
	tableAutoFocus?:
		| string
		| ((params: VxeGlobalRendererHandles.RenderTableEditParams<any> | VxeGlobalRendererHandles.RenderTableCellParams<any>) => HTMLElement | null);
	/**
	 * 表格 - 激活编辑状态时，设置是否自动选中 tableAutoFocus 指定的元素
	 */
	tableAutoSelect?: boolean;
	/**
	 * 表格 - 渲染编辑状态时，与 renderTableCell 配合使用
	 */
	renderTableEdit?(
		renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions<any>,
		params: VxeGlobalRendererHandles.RenderTableEditParams<any>,
	): VxeComponentSlotType | VxeComponentSlotType[];
	/**
	 * 表格 - 渲染非编辑状态时，与 renderTableEdit 配合使用
	 */
	renderTableCell?(
		renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions<any>,
		params: VxeGlobalRendererHandles.RenderTableCellParams<any>,
	): VxeComponentSlotType | VxeComponentSlotType[];

	/**
	 * 表格 - 展开行渲染
	 */
	renderTableExpand?(
		renderOpts: VxeGlobalRendererHandles.RenderTableExpandOptions,
		params: VxeGlobalRendererHandles.RenderTableExpandParams<any>,
	): VxeComponentSlotType | VxeComponentSlotType[];

	/**
	 * 表格 - 空数据时渲染
	 */
	renderTableEmpty?(
		renderOpts: VxeGlobalRendererHandles.RenderTableEmptyOptions,
		params: VxeGlobalRendererHandles.RenderTableEmptyParams,
	): VxeComponentSlotType | VxeComponentSlotType[];

	renderTableEmptyView?(
		renderOpts: VxeGlobalRendererHandles.RenderTableEmptyOptions,
		params: VxeGlobalRendererHandles.RenderTableEmptyParams,
	): VxeComponentSlotType | VxeComponentSlotType[];
	// 工具栏
	/**
	 * 工具栏 - 左侧按钮设置 class
	 */
	toolbarButtonClassName?: string | ((params: VxeGlobalRendererHandles.RenderButtonParams<any>) => string | VxeComponentClassNameType);
	/**
	 * 工具栏 - 渲染左侧按钮
	 */
	renderToolbarButton?(
		renderOpts: VxeGlobalRendererHandles.RenderButtonOptions,
		params: VxeGlobalRendererHandles.RenderButtonParams<any>,
	): VxeComponentSlotType | VxeComponentSlotType[];
	/**
	 * 工具栏 - 右侧按钮设置 class
	 */
	toolbarToolClassName?: string | ((params: VxeGlobalRendererHandles.RenderToolParams<any>) => string | VxeComponentClassNameType);
	/**
	 * 工具栏 - 渲染右侧按钮
	 */
	renderToolbarTool?(
		renderOpts: VxeGlobalRendererHandles.RenderToolOptions,
		params: VxeGlobalRendererHandles.RenderToolParams<any>,
	): VxeComponentSlotType | VxeComponentSlotType[];

	/**
	 * 表单项 - 设置自动聚焦元素 class
	 */
	formItemAutoFocus?: string | ((params: VxeGlobalRendererHandles.RenderFormItemAutoFocusParams) => HTMLElement | null);
	/**
	 * 表单项 - 设置表单项的 class
	 */
	formItemClassName?: string | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => string | VxeComponentClassNameType);
	/**
	 * 表单项 - 设置表单项的样式
	 */
	formItemStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => VxeComponentStyleType);
	/**
	 * 表单项 - 设置表单项内容元素的 class
	 */
	formItemContentClassName?: string | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => string | VxeComponentClassNameType);
	/**
	 * 表单项 - 设置表单项内容元素的样式
	 */
	formItemContentStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => VxeComponentStyleType);
	/**
	 * 表单项 - 设置表单项标题元素的 class
	 */
	formItemTitleClassName?: string | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => string | VxeComponentClassNameType);
	/**
	 * 表单项 - 设置表单项标题元素的样式
	 */
	formItemTitleStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => VxeComponentStyleType);
	/**
	 * 表单项 - 渲染表单项标题
	 */
	renderFormItemTitle?(
		renderOpts: VxeGlobalRendererHandles.RenderFormItemTitleOptions,
		params: VxeGlobalRendererHandles.RenderFormItemTitleParams,
	): VxeComponentSlotType | VxeComponentSlotType[];
	/**
	 * 表单项 - 渲染表单项内容
	 */
	renderFormItemContent?(
		renderOpts: VxeGlobalRendererHandles.RenderFormItemContentOptions,
		params: VxeGlobalRendererHandles.RenderFormItemContentParams,
	): VxeComponentSlotType | VxeComponentSlotType[];
	/**
	 * 表单项 - 自定义表单项被显示隐藏逻辑
	 */
	formItemVisibleMethod?(params: VxeGlobalRendererHandles.FormItemVisibleMethodParams): boolean;
	/**
	 * 表单项 - 自定义表单项被重置时的逻辑
	 */
	formItemResetMethod?(params: VxeGlobalRendererHandles.FormItemResetMethodParams): void;
}

export namespace VxeGlobalRendererHandles {
	export interface RenderFormItemAutoFocusParams {
		// TODO
		$form: any;
		$grid: VxeGridConstructor | null;
		data: any;
		item: any;
		field: string;
	}

	export interface RenderFormItemTitleOptions {}

	export interface RenderFormItemTitleParams {}

	export interface RenderFormItemContentOptions {}

	export interface RenderFormItemContentParams {}

	export interface FormItemVisibleMethodParams {}

	export interface FormItemResetMethodParams {}
}
