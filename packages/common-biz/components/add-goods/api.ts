import { http } from '../../http';

/**
 * 根据关键词进行搜索
 * @param key
 */
export function queryProductsApi(key: string) {
	return http.post('/product/searchByProduct', { key });
}

/**
 * 根据商品ID获取SKU信息
 * @param product_id
 */
export function queryProductSKUApi(productId: string | number) {
	return http.post('/product/sku/index', { product_id: productId });
}

/**
 * 根据商品售价和数量获取对应的价格信息
 * @param params
 * @returns
 */
export function querySKUPriceApi(params: { product_sku_id: number; product_amount: number; price: string | number }) {
	return http.post('/order/getSkuPrice', params);
}
