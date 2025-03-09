/**
 * 选择商品入参
 */
export interface SelectGoodsPopProps {
	/**
	 * 标题
	 */
	title: string;
	/**
	 * 已选择的商品ids
	 */
	ids?: (string | number)[];

	/**
	 * 案例ID
	 */
	case_id?: string | number;
}
