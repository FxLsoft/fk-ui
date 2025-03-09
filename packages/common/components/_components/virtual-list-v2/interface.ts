import type { VNode } from 'vue';

export type VirtualItemKey = string | number;

export interface InternalDataItem {
	key: VirtualItemKey;
	index: number;
	item: unknown;
}

export type ItemSlot = (props: { item: unknown; index: number }) => VNode[];

export interface ScrollIntoViewOptions {
	index?: number;
	key?: VirtualItemKey;
	align: 'auto' | 'top' | 'bottom';
}

/**
 * 虚拟列表组件属性
 */
export interface VirtualListProps {
	/**
	 * @zh 可视区域高度
	 * @en Viewable area height
	 */
	height?: number | string;
	/**
	 * @zh 虚拟列表数据源
	 */
	data?: unknown[];
	/**
	 * @zh 开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。
	 * @en The threshold of the number of elements to enable virtual scrolling. When the number of data is less than the threshold, virtual scrolling will not be enabled.
	 */
	threshold?: number;
	/**
	 * @zh 元素高度是否是固定的。
	 */
	isStaticItemHeight?: boolean;
	/**
	 * @zh 元素高度是否是固定的。
	 * @en Is the element height fixed.
	 * @version 1.0.0
	 */
	fixedSize?: boolean;
	/**
	 * @zh 元素高度不固定时的预估高度。
	 * @en Is the element height fixed.
	 * @version 1.0.0
	 */
	estimatedSize?: number;
	/**
	 * @zh 视口边界外提前挂载的元素数量。
	 * @en The number of elements mounted in advance outside the boundary of the viewport.
	 * @defaultValue 10
	 * @version 1.0.0
	 */
	buffer?: number;
	/**
	 * @zh 虚拟列表key。
	 */
	itemKey?: string | ((item: unknown) => VirtualItemKey);
	component?: keyof HTMLElementTagNameMap;
}

export type ScrollOptions = number | { index?: number; key?: VirtualItemKey; align?: 'auto' | 'top' | 'bottom' };

export interface VirtualListRef {
	scrollTo: (options: ScrollOptions) => void;
}
