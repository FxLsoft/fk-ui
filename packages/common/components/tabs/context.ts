import type { InjectionKey } from 'vue';
import type { TabData, TabTriggerEvent } from './interface';

export interface TabsContext {
	lazyLoad: boolean;
	destroyOnHide: boolean;
	activeKey: string | number;
	addItem: (id: number, data: TabData) => void;
	removeItem: (id: number) => void;
	trigger: TabTriggerEvent;
}

export const tabsInjectionKey: InjectionKey<TabsContext> = Symbol('Tabs');
