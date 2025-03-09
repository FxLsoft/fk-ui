import { ref, watch } from 'vue';
import { isFunction, isPromise } from '@erp/common';
import type { OptionData } from './interface';

/**
 * 对options进行处理
 * @param opts
 * @returns
 */
export function useOptionDataHook(props: any) {
	const options = ref<(string | number | OptionData)[]>([]);
	watch(
		() => props.options,
		() => {
			doFormatOptions();
		},
	);
	const loading = ref(false);
	const doFormatOptions = () => {
		if (isFunction(props.options)) {
			const result = props.options();
			if (isPromise(result)) {
				loading.value = true;
				result
					.then((res: any) => {
						options.value = res;
					})
					.finally(() => {
						loading.value = false;
					});
			} else {
				options.value = result;
			}
		} else {
			options.value = props.options;
		}
	};
	doFormatOptions();
	return {
		options,
		loading,
	};
}

/**
 * 处理 attrs
 * @param attrs
 * @returns
 */
export function processAttrs(attrs: Record<string, any>) {
	const processedAttrs: Record<string, any> = {};

	for (const key in attrs) {
		if (Object.prototype.hasOwnProperty.call(attrs, key)) {
			const camelCaseKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
			processedAttrs[camelCaseKey] = attrs[key];
		}
	}

	return processedAttrs;
}
