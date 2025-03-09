import type { InjectionKey, Slots } from 'vue';
import type { LocalLang } from '../locale/interface';
import type { Size } from '../_utils/constant';

export interface ConfigProvider {
	slots: Slots;
	prefixCls?: string;
	locale?: LocalLang;
	size?: Size;
	updateAtScroll?: boolean;
	scrollToClose?: boolean;
	exchangeTime?: boolean;
}

export const configProviderInjectionKey: InjectionKey<ConfigProvider> = Symbol('ConfigProvider');
