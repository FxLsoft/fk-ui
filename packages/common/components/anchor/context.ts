import type { InjectionKey } from 'vue';

export interface AnchorContext {
	currentLink: string;
	addLink: (hash: string, node: HTMLElement) => void;
	removeLink: (hash: string) => void;
	handleClick: (e: Event, hash?: string) => void;
}

export const anchorInjectionKey: InjectionKey<AnchorContext> = Symbol('Anchor');
