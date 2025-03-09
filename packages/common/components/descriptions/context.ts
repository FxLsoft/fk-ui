import type { InjectionKey } from 'vue';
import type { DescItemData } from './interface';

export interface DescriptionsContext {
	addItem: (id: number, data: DescItemData) => void;
	removeItem: (id: number) => void;
}

export const descriptionsInjectionKey: InjectionKey<DescriptionsContext> = Symbol('Descriptions');
