import { http } from '../../http';

/**
 * 根据案例id获取商品列表
 * @param params
 * @todo 声明入参
 * @returns
 */
export function getGoodsListByCaseApi(params) {
	return http.post('/case/main/selectProductList', params);
}

/**
 * 获取供应商列表
 * @param params
 * @todo 声明入参
 * @returns
 */
export function getSupplierApi(params?) {
	params = Object.assign({ page_size: 1000, page: 1 }, params);
	return http.post('/supplier/index', params).then(res => {
		const list = res.list || [];
		list.forEach(item => {
			item.label = item.name;
			item.value = item.id;
		});
		return list;
	});
}
