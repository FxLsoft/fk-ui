import { http } from '../../http';

/**
 * 获取产品分类
 * @todo 声明入参
 * @param params
 */
export function getGoodCategoryApi(params) {
	return http.post('/category/index', params, {
		// cache: true,
	});
}
