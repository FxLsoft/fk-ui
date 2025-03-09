export interface ButtonConfig {}

export namespace VxeTooltipPropTypes {
	export type Size = any;
	export type ModelValue = boolean;
	export type Trigger = 'hover' | 'click' | 'manual' | '' | null;
	export type Theme = '' | 'light' | 'dark';
	export type Content = string | number;
	export type UseHTML = boolean;
	export type ZIndex = string | number;
	export type PopupClassName = string | ((params: { $tooltip: any }) => string);
	export type IsArrow = boolean;
	export type Enterable = boolean;
	export type EnterDelay = number;
	export type LeaveDelay = number;
	export type LeaveMethod = (params: { $event: MouseEvent }) => boolean;
}
