import { http } from '../../http';

/**
 * 线索列表
 */
export const queryClueListApi = (params: any) => {
	return http.post('/thread/index', params);
};
