import { pop } from '../pop';
import AddGoodsPop from './AddGoodsPop.vue';
import type { AddGoodsPopProps } from './interface';

/**
 * 打开添加商品弹窗
 * @param props
 * @returns
 */
export function createAddGoodsPop(props: AddGoodsPopProps) {
	return pop.createPage(AddGoodsPop, props);
}
