/**
 * 全局业务静态
 */

import type { GlobalOptions } from '@erp/common';

/**
 * 业务组件前缀
 */
const COMPONENT_PREFIX = 'Erp';

export const getComponentPrefix = (options?: GlobalOptions) => {
	return options?.componentPrefix ?? COMPONENT_PREFIX;
};

export const MODEL_VALUE = 'modelValue' as const;
export const UPDATE_MODEL = 'update:modelValue' as const;
export const ON_UPDATE_MODEL = 'onUpdate:modelValue' as const;
export const POP_COMMON_EMITS = [UPDATE_MODEL, 'ok', 'close', 'loading'] as const;
export const AssetsServer = '//static.erp.91spyc.com/assets' as const;
