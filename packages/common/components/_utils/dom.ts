import { isString } from './is';
import type { VNode } from 'vue';

export const NOOP = () => {
	return undefined;
};
export interface DocSize {
	height: number;
	width: number;
}
export const getDocumentSize = (): DocSize => {
	const { body } = document;
	const html = document.documentElement;
	let topBody;
	try {
		const topWindow = window.top || window.self || window;
		topBody = topWindow.document.body;
	} catch {}

	return {
		height: Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight,
			topBody?.scrollHeight || 0,
			topBody?.clientHeight || 0,
		),
		width: Math.max(
			body.scrollWidth,
			body.offsetWidth,
			html.clientWidth,
			html.scrollWidth,
			html.offsetWidth,
			topBody?.scrollWidth || 0,
			topBody?.clientWidth || 0,
		),
	};
};
export const isServerRendering = (() => {
	try {
		return !(typeof window !== 'undefined' && document !== undefined);
	} catch {
		return true;
	}
})();

export const on = (() => {
	if (isServerRendering) {
		return NOOP;
	}
	return <K extends keyof HTMLElementEventMap>(
		element: HTMLElement | Window | Document,
		event: K,
		handler: (ev: HTMLElementEventMap[K]) => void,
		options: boolean | AddEventListenerOptions = false,
	) => {
		element.addEventListener(event, handler as EventListenerOrEventListenerObject, options);
	};
})();

export const off = (() => {
	if (isServerRendering) {
		return NOOP;
	}
	return <K extends keyof HTMLElementEventMap>(
		element: HTMLElement | Window,
		type: K,
		handler: (ev: HTMLElementEventMap[K]) => void,
		options: boolean | EventListenerOptions = false,
	) => {
		element.removeEventListener(type, handler as EventListenerOrEventListenerObject, options);
	};
})();

export const findDomNode = (vnode: VNode) => {
	let node = vnode.el;
	while (node && !node.tagName) {
		node = node.nextSibling;
	}
	return node as HTMLElement;
};

export const contains = (root: Node | null | undefined, ele: Node | null) => {
	if (!root || !ele) {
		return false;
	}
	let node: Node | null = ele;
	while (node) {
		if (node === root) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
};

export const OVERLAY_TYPES = ['modal', 'message', 'notification', 'drawer', 'page'] as const;

export const getOverlay = (type: (typeof OVERLAY_TYPES)[number]) => {
	const popper = document.createElement('div');
	popper.setAttribute('class', `fk-overlay fk-overlay-${type}`);
	return popper;
};

export const querySelector = (selectors: string, container?: Document | HTMLElement) => {
	if (isServerRendering) {
		return NOOP();
	}
	return (container ?? document).querySelector<HTMLElement>(selectors) ?? undefined;
};

export const getElement = (target: string | HTMLElement | undefined, container?: Document | HTMLElement): HTMLElement | undefined => {
	if (isString(target)) {
		const selector = target[0] === '#' ? `[id='${target.slice(1)}']` : target;
		return querySelector(selector, container);
	}
	return target;
};

/**
 * Get the relative distance between two DOMs
 * @param target
 * @param relative
 */
export const getRelativeRect = (target: HTMLElement, relative: HTMLElement) => {
	const targetRect = target.getBoundingClientRect();
	const relativeRect = relative.getBoundingClientRect();

	return {
		top: targetRect.top - relativeRect.top,
		bottom: relativeRect.bottom - targetRect.bottom,
		left: targetRect.left - relativeRect.left,
		right: relativeRect.right - targetRect.right,
		width: targetRect.width,
		height: targetRect.height,
	};
};

export const isScroll = (element: HTMLElement) => {
	return element.tagName === 'BODY' ? document.documentElement.scrollHeight > window.innerHeight : element.scrollHeight > element.offsetHeight;
};

export const getScrollBarWidth = (element: HTMLElement) => {
	return element.tagName === 'BODY' ? window.innerWidth - getDocumentSize().width : element.offsetWidth - element.clientWidth;
};

/**
 * 获取某个节点下所占的实际宽度和高度
 * @param el
 */
export function getChildClientRect(el: HTMLElement): { width: number; height: number } {
	if (!el) return null;
	const range = document.createRange();
	range.setStart(el, 0);
	range.setEnd(el, el.childNodes.length);
	const paddingLeft = Number.parseInt(getElementStyle(el, 'paddingLeft'), 10) || 0;
	const paddingRight = Number.parseInt(getElementStyle(el, 'paddingRight'), 10) || 0;
	const paddingTop = Number.parseInt(getElementStyle(el, 'paddingTop'), 10) || 0;
	const paddingBottom = Number.parseInt(getElementStyle(el, 'paddingBottom'), 10) || 0;
	const rect = range.getBoundingClientRect();
	return {
		width: rect.width + paddingLeft + paddingRight,
		height: rect.height + paddingTop + paddingBottom,
	};
}

/**
 * 获取元素的计算属性样式
 * @param element
 * @param property
 * @returns
 */
export function getElementStyle(element, property) {
	let proValue = null;
	if (element.currentStyle) {
		proValue = element.currentStyle[property];
	} else {
		proValue = document.defaultView.getComputedStyle(element)[property];
	}
	return proValue;
}

/**
 *  检查el是否完全在view视图内
 *
 *  @param el {dom} 被检查的dom
 *  @param view {dom | root}
 *  @param preLoad {number} 进入因子
 */
export function checkElInView(el, view: HTMLElement | Window | Document = window, preLoad = 1) {
	if (!el) return;
	let viewRect: DOMRect;
	if (view === window || view === document || (view as HTMLElement).tagName.toUpperCase() === 'HTML') {
		viewRect = {
			x: 0,
			y: 0,
			left: 0,
			top: 0,
			height: window.innerHeight,
			width: window.innerWidth,
			right: window.innerWidth,
			bottom: window.innerHeight,
		} as DOMRect;
	} else {
		viewRect = (view as HTMLElement).getBoundingClientRect();
	}
	const rect = el.getBoundingClientRect();
	if (rect.width === 0 && rect.height === 0) {
		return false;
	}
	const isInView = rect.right >= viewRect.left && rect.bottom >= viewRect.top && rect.left <= viewRect.right && rect.top <= viewRect.bottom;
	return isInView;
}

/**
 * Returns the scrolling parent of the given element
 * @function
 * @ignore
 * @argument {Element} element
 * @returns {Element} offset parent
 */
export function getParentScroller(element: HTMLElement): HTMLElement {
	if (!element) {
		return document.body;
	}
	const parent = element.parentNode;

	if (!parent) {
		return element;
	}

	if (parent === document) {
		// Firefox puts the scrollTOp value on `documentElement` instead of `body`, we then check which of them is
		// greater than 0 and return the proper element
		if (document.body.scrollTop || document.body.scrollLeft) {
			return document.body;
		} else {
			return document.documentElement;
		}
	}

	// Firefox want us to check `-x` and `-y` variations as well
	if (
		['scroll', 'auto'].includes(getStyleComputedProperty(parent, 'overflow')) ||
		['scroll', 'auto'].includes(getStyleComputedProperty(parent, 'overflow-x')) ||
		['scroll', 'auto'].includes(getStyleComputedProperty(parent, 'overflow-y'))
	) {
		// If the detected scrollParent is body, we perform an additional check on its parentNode
		// in this way we'll get body if the browser is Chrome-ish, or documentElement otherwise
		// fixes issue #65
		return parent as HTMLElement;
	}
	return getParentScroller(element.parentNode as HTMLElement);
}

/**
 * Get CSS computed property of the given element
 * @function
 * @ignore
 * @argument {Element} element
 * @argument {String} property
 */
export function getStyleComputedProperty(element, property) {
	// NOTE: 1 DOM access here
	const css = window.getComputedStyle(element, null);
	return css[property];
}
