import { pop } from '../pop';
import SelectGoodsPop from './SelectGoodsPop.vue';
import type { SelectGoodsPopProps } from './interface';

export * from './interface';

/**
 * 根据案例选择商品
 * @param props
 * @returns
 */
export function selectGoodsPop(props: SelectGoodsPopProps) {
	return pop.createPage(SelectGoodsPop, props);
}
