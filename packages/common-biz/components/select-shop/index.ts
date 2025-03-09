import { pop } from '../pop';
import SelectShopPop from './SelectShopPop.vue';
import type { SelectShopPopProps } from './interface';

/**
 * 选择店铺
 */
export function selectShopPop(props: SelectShopPopProps) {
	return pop.createPage(SelectShopPop, props);
}

export * from './interface';

export * from './api';
