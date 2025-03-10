import type { ButtonProps } from '@erp/common';
import type {
	DefineVxeComponentApp,
	DefineVxeComponentInstance,
	DefineVxeComponentOptions,
	ValueOf,
	VxeComponentBaseOptions,
	VxeComponentEventParams,
	VxeComponentSizeType,
} from '..';
import type { Ref, RenderFunction, SetupContext } from 'vue';
import type { VxeTableConstructor, VxeTableDefines, VxeTablePrivateMethods } from './table';

export declare const VxeToolbar: DefineVxeComponentApp<VxeToolbarProps, VxeToolbarEventProps, VxeToolbarSlots>;
export type VxeToolbarComponent = DefineVxeComponentOptions<VxeToolbarProps, VxeToolbarEventProps>;

export type VxeToolbarInstance = DefineVxeComponentInstance<VxeToolbarProps, VxeToolbarConstructor>;

export interface VxeToolbarConstructor extends VxeComponentBaseOptions, VxeToolbarMethods {
	props: VxeToolbarProps;
	context: SetupContext<VxeToolbarEmits>;
	reactData: ToolbarReactData;
	getRefMaps(): ToolbarPrivateRef;
	getComputeMaps(): ToolbarPrivateComputed;
	renderVN: RenderFunction;
}

export interface ToolbarPrivateRef {
	refElem: Ref<HTMLDivElement | undefined>;
}
export interface VxeToolbarPrivateRef extends ToolbarPrivateRef {}

export namespace VxeToolbarPropTypes {
	export type Size = VxeComponentSizeType;
	export type Id = string;
	export type Loading = boolean;

	interface ResizableConfig {
		storage?: boolean;
	}
	export type Resizable = boolean | ResizableConfig;
	export interface ResizableOpts extends ResizableConfig {}

	interface RefreshConfig {
		queryMethod?(params: { [key: string]: any }): any;
		code?: 'query' | 'reload' | '' | null;
		icon?: string;
		iconLoading?: string;
	}
	export type Refresh = boolean | RefreshConfig;
	export interface RefreshOpts extends RefreshConfig {}

	interface ImportConfig {
		icon?: string;
	}
	export type Import = boolean | ImportConfig;
	export interface ImportOpts extends ImportConfig {}

	interface ExportConfig {
		icon?: string;
	}
	export type Export = boolean | ExportConfig;
	export interface ExportOpts extends ExportConfig {}

	export interface PrintConfig {
		icon?: string;
	}
	export type Print = boolean | PrintConfig;
	export interface PrintOpts extends PrintConfig {}

	interface ZoomConfig {
		iconIn?: string;
		iconOut?: string;
	}
	export type Zoom = boolean | ZoomConfig;
	export interface ZoomOpts extends ZoomConfig {}

	interface CustomConfig {
		icon?: string;
	}
	export type Custom = boolean | CustomConfig;
	export interface CustomOpts extends CustomConfig {}

	interface ButtonAndToolConfig extends ButtonProps {
		code?: string;
		visible?: boolean | (() => boolean);
		params?: any;
	}

	export interface ButtonRender {
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
	}
	export interface ButtonConfig extends ButtonAndToolConfig {
		dropdowns?: ButtonConfig[];
		buttonRender?: ButtonRender;
	}
	export type Buttons = ButtonConfig[];

	export interface ToolRender {
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
	}
	export interface ToolConfig extends ButtonAndToolConfig {
		dropdowns?: ToolConfig[];
		toolRender?: ToolRender;
	}
	export type Tools = ToolConfig[];

	export type Perfect = boolean;

	export type ClassName = string | ((params: { $toolbar: VxeToolbarConstructor }) => string);
}

export type VxeToolbarProps = {
	size?: VxeToolbarPropTypes.Size;
	/**
	 * 唯一 ID 标识
	 */
	id?: VxeToolbarPropTypes.Id;
	/**
	 * 是否加载中
	 */
	loading?: VxeToolbarPropTypes.Loading;
	/**
	 * 列宽拖动配置
	 */
	resizable?: VxeToolbarPropTypes.Resizable;
	/**
	 * 刷新按钮配置
	 */
	refresh?: VxeToolbarPropTypes.Refresh;
	/**
	 * 导入按钮配置
	 */
	import?: VxeToolbarPropTypes.Import;
	/**
	 * 导出按钮配置
	 */
	export?: VxeToolbarPropTypes.Export;
	print?: VxeToolbarPropTypes.Print;
	zoom?: VxeToolbarPropTypes.Zoom;
	/**
	 * 自定义列配置
	 */
	custom?: VxeToolbarPropTypes.Custom;
	/**
	 * 按钮列表
	 */
	buttons?: VxeToolbarPropTypes.Buttons;
	tools?: VxeToolbarPropTypes.Tools;
	/**
	 * 配套的样式
	 */
	perfect?: VxeToolbarPropTypes.Perfect;
	className?: VxeToolbarPropTypes.ClassName;
};

export interface ToolbarPrivateComputed {}
export interface VxeToolbarPrivateComputed extends ToolbarPrivateComputed {}

export interface ToolbarReactData {
	isRefresh: boolean;
	columns: VxeTableDefines.ColumnInfo[];
}

export interface ToolbarMethods {
	dispatchEvent(type: ValueOf<VxeToolbarEmits>, params: Record<string, any>, evnt: Event | null): void;
	syncUpdate(params: { collectColumn: VxeTableDefines.ColumnInfo<any>[]; $table: VxeTableConstructor<any> & VxeTablePrivateMethods<any> }): void;
}
export interface VxeToolbarMethods extends ToolbarMethods {}

export interface ToolbarPrivateMethods {}
export interface VxeToolbarPrivateMethods extends ToolbarPrivateMethods {}

export type VxeToolbarEmits = ['button-click', 'tool-click'];

export namespace VxeToolbarDefines {
	export interface ToolbarEventParams extends VxeComponentEventParams {
		$toolbar: VxeToolbarConstructor;
	}
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type VxeToolbarEventProps = {};

export interface VxeToolbarListeners {}

export namespace VxeToolbarEvents {}

export namespace VxeToolbarSlotTypes {
	export interface DefaultSlotParams {}
}

export interface VxeToolbarSlots {
	/**
	 * 自定义左侧按钮列表
	 */
	buttons?: (params: { [key: string]: any }) => any;
	/**
	 * 自定义右侧工具列表
	 */
	tools?: ((params: { [key: string]: any }) => any) | undefined;
}

export const Toolbar: typeof VxeToolbar;
export default VxeToolbar;
