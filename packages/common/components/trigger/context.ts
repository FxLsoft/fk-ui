import type { InjectionKey } from 'vue';

export interface TriggerContext {
	onMouseenter?: (ev: MouseEvent) => void;
	onMouseleave?: (ev: MouseEvent) => void;
	addChildRef: (ref: any) => void;
	removeChildRef: (ref: any) => void;
}

export const triggerInjectionKey: InjectionKey<TriggerContext> = Symbol('Trigger');

/**
 * reference popper 之间的对应关系
 */
export const ReferencePopperWeakMap = new WeakMap<HTMLElement, HTMLElement>();
