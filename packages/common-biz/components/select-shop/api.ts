import http from '../../http';

/**
 * 获取店铺API
 * @param params
 * @returns
 */
export function getStoreApi(params?: { name?: string }) {
	return http.post('/store/getStores', params, {
		cache: true,
	});
}
