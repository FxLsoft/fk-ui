import { isFunction, noop } from 'lodash-es';
import { off, on } from '../../utils';
import { ReferencePopperWeakMap } from '../../components/trigger/context';
import type { ComponentInternalInstance, Directive, DirectiveHook } from 'vue';

/*
 * @description:
 * @author: fxlsoft
 */

const ctx = Symbol('__ctx');
const evt = Symbol('__event');
const timeoutId = Symbol('__timeoutId');

export type EventOutsideDom = HTMLElement & {
	__id?: number;
	__hasBindEvent?: boolean;
	__status?: 'in' | 'out' | 'outing';
	__popper?: HTMLElement;
	__vueParentComponent?: ComponentInternalInstance;
	[timeoutId]?: number;
	[ctx]?: {
		id: number;
		documentHandler: Function;
		inCallback: Function;
		outCallback: Function;
	};
	[evt]?: Array<{
		type: keyof HTMLElementEventMap;
		method: (ev: MouseEvent) => void;
	}>;
};

type EventOutsideOptions =
	| Function
	| {
			trigger?: 'click' | 'hover';
			inCallback?: Function;
			outCallback?: Function;
	  };

export class EventOutsideModel {
	nodeList: EventOutsideDom[] = [];

	startClick: Function = noop;
	seed = 0;
	time = 100;

	private static instance = null;

	constructor() {
		on(document, 'mousedown', this.mousedown.bind(this));
		on(document, 'touchstart', this.mousedown.bind(this));
		on(document, 'mouseup', this.mouseup.bind(this));
		on(document, 'touchend', this.mouseup.bind(this));
	}

	static getInstance(): EventOutsideModel {
		const model = EventOutsideModel;
		if (!model.instance) {
			model.instance = new model();
		}
		return model.instance;
	}

	mousedown(e) {
		this.startClick = e;
	}

	mouseup(e) {
		this.nodeList.forEach(el => {
			el[ctx].documentHandler(e, this.startClick);
		});
	}

	updateEvent(el: EventOutsideDom, options: EventOutsideOptions) {
		this.removeEvent(el);
		if (!el.__id) {
			el.__id = this.getSeed();
		}
		let inCallback, outCallback;
		let trigger: 'click' | 'hover' = 'click';
		if (typeof options == 'function') {
			outCallback = options;
		} else if (options) {
			outCallback = options.outCallback;
			inCallback = options.inCallback;
			trigger = options.trigger || 'click';
		}
		if (trigger == 'click') {
			this.nodeList.push(el);
			el[ctx] = {
				id: el.__id,
				documentHandler: this.createDocumentHandler(el),
				inCallback,
				outCallback,
			};
		} else {
			this.updateMoveEvent(el, inCallback, outCallback);
		}
	}

	updateMoveEvent(el: EventOutsideDom, inCallback: Function, outCallback: Function) {
		const arr = [el];
		const popper = ReferencePopperWeakMap.get(el);
		if (popper) {
			arr.push(popper);
		}
		arr.forEach(element => {
			if (element.__hasBindEvent) return;
			element.__hasBindEvent = true;
			const handleIn = (e: MouseEvent) => {
				if (el[timeoutId]) {
					clearTimeout(el[timeoutId]);
				}
				if (el.__status !== 'in' && el.__status !== 'outing' && isFunction(inCallback)) {
					inCallback();
				}
				// contextEnter(el);
				el.__status = 'in';
			};
			const handleOut = (e: MouseEvent) => {
				if (el.__status === 'in') {
					if (el[timeoutId]) {
						clearTimeout(el[timeoutId]);
					}
					const doOut = () => {
						if (el.__status === 'in') return;
						if (isPointInElement(el, e)) return;
						if (isPointInContext(el, e)) return;
						if (isFunction(outCallback)) {
							outCallback();
						}
						el.__status = 'out';
					};
					el[timeoutId] = window.setTimeout(
						() => {
							doOut();
						},
						popper ? this.time : 0,
					);
					el.__status = 'outing';
				}
			};
			on(element, 'mouseenter', handleIn);
			on(element, 'mouseleave', handleOut);
			if (!element[evt]) {
				element[evt] = [];
			}
			element[evt].push({
				type: 'mouseenter',
				method: handleIn,
			});
			element[evt].push({
				type: 'mouseleave',
				method: handleOut,
			});
		});
	}

	createDocumentHandler(el: EventOutsideDom) {
		if (!el.__hasBindEvent) {
			const eventClick = e => {
				el.__status = 'in';
				if (el[ctx].inCallback) {
					el[ctx].inCallback();
				}
			};
			on(el, 'click', eventClick);
			on(el, 'touchend', eventClick);
			if (!el[evt]) {
				el[evt] = [];
			}
			el[evt].push({
				type: 'click',
				method: eventClick,
			});
			el[evt].push({
				type: 'touchend',
				method: eventClick,
			});
			el.__hasBindEvent = true;
		}
		return function (mouseup: MouseEvent, mousedown: MouseEvent) {
			if (
				!mouseup.target ||
				!mousedown.target ||
				el.contains(mouseup.target as HTMLElement) ||
				el.contains(mousedown.target as HTMLElement) ||
				isTargetInPopper(el, mouseup.target as HTMLElement)
			)
				return;
			if (el.__status !== 'out') {
				el[ctx].outCallback && el[ctx].outCallback();
			}
			el.__status = 'out';
		};
	}

	removeEvent(el: EventOutsideDom) {
		const len = this.nodeList.length;
		const nodeList = this.nodeList;
		for (let i = 0; i < len; i++) {
			if (el[ctx] && nodeList[i][ctx].id === el[ctx].id) {
				nodeList.splice(i, 1);
				break;
			}
		}
		delete el[ctx];
		const arr = [el];
		const popper = ReferencePopperWeakMap.get(el);
		if (popper) {
			arr.push(popper);
		}
		arr.forEach(element => {
			(element[evt] || []).forEach(evt => {
				off(element, evt.type, evt.method);
			});
			delete element[evt];
			delete element.__hasBindEvent;
		});
	}

	getSeed() {
		return ++this.seed;
	}
}

function isTargetInPopper(context: EventOutsideDom, target: HTMLElement) {
	// 下面有没有popper
	const popper = ReferencePopperWeakMap.get(context) as EventOutsideDom;
	if (popper) {
		if (popper.contains(target)) {
			return true;
		}
		// popper是否有reference
		const reference = ReferencePopperWeakMap.get(popper);
		if (reference) {
			if (isTargetInPopper(reference as EventOutsideDom, target)) {
				return true;
			}
		}
	}

	return false;
}

function isPointInContext(context: EventOutsideDom, e: MouseEvent): boolean {
	// 下面有没有popper
	const popper = ReferencePopperWeakMap.get(context);

	if (popper) {
		if (isPointInElement(popper, e)) {
			return true;
		}
		// popper是否有reference
		const reference = ReferencePopperWeakMap.get(popper);
		if (reference) {
			if (isPointInContext(reference as EventOutsideDom, e)) {
				return true;
			}
		}
	}

	return false;
}

function isPointInElement(el: HTMLElement, e: MouseEvent) {
	const rect = el.getBoundingClientRect();
	const deviation = 2; // 误差
	if (
		rect.left + deviation <= e.clientX &&
		rect.left + rect.width - deviation >= e.clientX &&
		rect.top + deviation <= e.clientY &&
		rect.top + rect.height - deviation >= e.clientY
	) {
		// 处理window下的chrome点击会触发mouseleave的bug, 坐标还在element范围内不触发
		return true;
	} else {
		return false;
	}
}

const EventOutsideDirectiveHook: DirectiveHook = (el: HTMLElement, binding, vnode) => {
	setTimeout(() => {
		EventOutsideModel.getInstance().updateEvent(el, binding.value);
	});
};

/**
 * 事件外执行指令
 * @link { EventOutsideOptions }
 */
export const vEventOutside: Directive = {
	mounted: EventOutsideDirectiveHook,
	// updated: EventOutsideDirectiveHook,
	beforeUnmount(el) {
		EventOutsideModel.getInstance().removeEvent(el);
	},
};
