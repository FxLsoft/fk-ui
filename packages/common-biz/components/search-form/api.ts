import { http } from '../../http';

/**
 * 筛选列表
 * @param tableName 唯一标识名称
 * @returns
 */
export const getTableFilterInfoApi = (tableName: string) => {
	return http.post('/admin/table/filter/index', { table_name: tableName });
};

/**
 * 筛选列表添加
 * @param params
 * @returns
 */
export const storeTableFilterApi = (params: { table_name: string; id?: string; name?: string; list?: any[]; form?: Record<string, any>; type: number }) => {
	return http.post('/admin/table/filter/store', params);
};

/**
 * 筛选列表更新
 * @param params
 * @returns
 */
export const updateTableFilterApi = (params: { table_name: string; id?: string; name?: string; list?: any[]; form?: Record<string, any>; type: number }) => {
	return http.post('/admin/table/filter/update', params);
};

/**
 * 筛选删除
 * @param id {number}
 * @returns
 */
export const destroyTableFilterApi = (id: number) => {
	return http.post('/admin/table/filter/destroy', { id });
};

/**
 * 筛选排序
 * @param ids
 * @returns
 */
export const updateTableFilterSortApi = (ids: number[]) => {
	return http.post('/admin/table/filter/sort', { ids });
};

/**
 * 用户获取动态表格
 * @param params
 * @returns
 */
export const reqGetDynamicTableApi = (table: string) => {
	return http.post('/auth/field', { table });
};
/**
 * 用户保存表格数据
 * @param params
 * @returns
 */
export const reqSaveDynamicTableApi = (table: string, content: any) => {
	return http.post('/auth/fieldUpdate', { table, content });
};
