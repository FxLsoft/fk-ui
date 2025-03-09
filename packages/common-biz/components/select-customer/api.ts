import { http } from '../../http';
import type { OptionData } from '../input';

/**
 * 搜索客户
 * @param params
 * @todo 声明入参
 * @returns
 */
export function queryCustomerListApi(params) {
	return http.post('/customer/index', params);
}

/**
 * 获取行业列表
 * @param params
 * @returns
 */
export function getIndustryOptionsApi(params = {}) {
	const format = list => {
		return list.map(item => {
			return {
				label: item.name,
				value: item.id,
				children: format(item.children),
			};
		});
	};
	return http.post('industry/index', params).then(res => {
		const list = res.list || [];
		return format(list);
	});
}

/**
 * 获取省市区树形
 * @returns
 */
export function getAddressTreeListApi() {
	return http.post('/system/address/index', {}, { cache: true, local: true }).then(res => {
		return res.list || [];
	});
}

/**
 * 获取活动列表
 * @param name
 * @returns
 */
export function getActivityListApi(name?: string) {
	return http.post<OptionData>('/activity/index', { name }).then((res: any) => {
		return (res.list || []).map(v => {
			return { label: v.name, value: v.id };
		});
	});
}

/**
 * 获取用户列表
 * @param params
 * @returns
 */
export function getUserListByNameApi(name: string) {
	return http.post<OptionData>('/admin/index', { name }).then((res: any) => {
		return (res.list || []).map(v => {
			return { label: v.name, value: v.id };
		});
	});
}

/**
 * 渠道列表
 * @param params
 * @returns
 */
export function getChannelListApi(params: any) {
	return http.post<OptionData>('/admin/index', params).then((res: any) => {
		return (res.list || []).map(v => {
			return { label: v.name, value: v.id };
		});
	});
}

/**
 * 获取店铺列表
 * @param params
 * @returns
 */
export function getStoreListApi(params: any) {
	return http.post<OptionData>('/store/index', params).then((res: any) => {
		return (res.list || []).map(v => {
			return { label: v.store_name, value: v.id };
		});
	});
}

/**
 * 保存客户
 * @param params
 * @returns
 */
export function addOrUpdateCustomerApi(params: any) {
	let actionUrl = '/customer/store';
	if (params.id) {
		actionUrl = '/customer/update';
	}
	return http.post(actionUrl, params);
}

/**
 * 保存客户
 * @param params
 * @returns
 */
export function getSocialAccountOptionsApi(params: any = {}) {
	const format = list => {
		return list.map(item => ({
			label: item.name,
			children: item.children.map(sub => ({
				label: `${sub.name} - ${sub.phone}`,
				value: sub.id,
			})),
		}));
	};
	return http.post('/socialAccount/index', params, { cache: true }).then(res => {
		return format(res.list || []);
	});
}

/**
 * 负责人列表
 * @param params
 * @returns
 */
export function getDirectorListApi(params: any = {}) {
	//递归地转换成cascade可用的option
	const recurseFormat = list => {
		if (!list || list.length <= 0) {
			return [];
		}
		return list
			.filter(item => {
				//过滤children为空, 成员也为空的部门
				return !(item.children?.length <= 0 && item.admin_user?.length <= 0);
			})
			.map(item => {
				const result: any = {};
				result.label = item.name;
				// result.value = item.id 部门不分配value,防止回显时显示部门(因为人的id和部门有重复的)
				if (item.children || item.admin_user) {
					result.children = [];
					if (item.admin_user) {
						if (item.admin_user.length <= 0) {
							if (item.children && item.children.length > 0) {
								result.children = recurseFormat(item.children);
							}
						} else {
							if (item.children && item.children.length > 0) {
								result.children = recurseFormat(item.children);
							}
							const user = item.admin_user.map(item => ({
								label: item.name,
								value: item.id,
							}));
							result.children = result.children.concat(user);
						}
					}
				}

				return result;
			});
	};
	return http.post('/crm/directorList', params, { cache: true }).then(res => {
		return recurseFormat(res);
	});
}

/**
 * 经销商列表
 * @param params
 * @returns
 */
export const getFranchiseListApi = (params: any = {}) => {
	return http.post('/franchise/index', params, { cache: true }).then(res => {
		return (res.list || []).map(item => ({
			label: item.franchise_name,
			value: item.id,
		}));
	});
};

/**
 * 客户授信列表
 * @param params
 * @returns
 */
export const getCreditListApi = (params: any) => {
	return http.post('/customer/credit/index', params);
};

/**
 * 通过ID获取客户信息
 * @param id
 * @returns
 */
export const getCustomerDetailApi = (id: string | number) => {
	return http.post('/customer/show', { id });
};

/**
 * 修改脱敏字段
 * @param params
 * @returns
 */
export const updateCustomerSingleApi = (params: any = {}) => {
	return http.post('/customer/updateMaskField', params);
};

/**
 * 地址解析
 * @param params
 * @returns
 */
export const analysisAddressReverseApi = (address: string) => {
	return http.post('/system/address/reverse', { address });
};
