import { reactive } from 'vue';

import type { VxeGlobalI18nLocale } from '../../types';

export const i18nConfigStore: {
	language: VxeGlobalI18nLocale;
	langMaps: Partial<Record<VxeGlobalI18nLocale, any>>;
} = reactive({
	language: '',
	langMaps: {},
});
