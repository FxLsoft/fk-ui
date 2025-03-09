import { computed, inject } from 'vue';
import { configProviderInjectionKey } from '../config-provider/context';
import type { Ref } from 'vue';
import type { Size } from '../_utils/constant';

export const useSize = (size?: Ref<Size | undefined>, { defaultValue = 'medium' }: { defaultValue?: Size } = {}) => {
	const configProviderCtx = inject(configProviderInjectionKey, undefined);

	const mergedSize = computed(() => size?.value ?? configProviderCtx?.size ?? defaultValue);

	return {
		mergedSize,
	};
};
