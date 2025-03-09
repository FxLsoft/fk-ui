import type { CSSProperties } from 'vue';
import type { TriggerEvent, TriggerPosition } from '../_utils/constant';

/**
 * 下拉的方向
 */
export type TriggerPopupTranslate = [number, number] | { [key in TriggerPosition]?: [number, number] };

/**
 * Trigger Props配置
 */
export interface TriggerProps {
	popupVisible?: boolean;
	defaultPopupVisible?: boolean;
	trigger?: TriggerEvent;
	position?: TriggerPosition;
	disabled?: boolean;
	popupOffset?: number;
	popupTranslate?: TriggerPopupTranslate;
	showArrow?: boolean;
	alignPoint?: boolean;
	popupHoverStay?: boolean;
	blurToClose?: boolean;
	clickToClose?: boolean;
	clickOutsideToClose?: boolean;
	unmountOnClose?: boolean;
	contentClass?: any;
	contentStyle?: CSSProperties;
	arrowClass?: any;
	arrowStyle?: CSSProperties;
	popupStyle?: CSSProperties;
	animationName?: string;
	duration?:
		| number
		| {
				enter: number;
				leave: number;
		  };
	mouseEnterDelay?: number;
	mouseLeaveDelay?: number;
	focusDelay?: number;
	autoFitPopupWidth?: boolean;
	autoFitPopupMinWidth?: boolean;
	autoFixPosition?: boolean;
	popupContainer?: string | HTMLElement;
	updateAtScroll?: boolean;
	autoFitPosition?: boolean;
}
