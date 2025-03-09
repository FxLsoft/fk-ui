/**
 * HTTP相关功能
 * 参数处理、请求合并、请求缓存、结果处理
 */
import axios from 'axios';
import { isString } from '@erp/common';
import { parseUrlParam } from '../utils';
import { pop } from '../components/pop';
import cache from './cache';
import type { AxiosInstance, AxiosResponse, Canceler, InternalAxiosRequestConfig } from 'axios';

/**
 * token key
 */
export const TOKEN_KEY = 'token_key';

/**
 * 获取token
 * @returns
 */
export function getToken() {
	return localStorage.getItem(TOKEN_KEY) || '';
}

/**
 * 获取header里的authorization token
 * Bearer ***
 * @returns
 */
export function getAuthorizationToken() {
	return `Bearer ${getToken()}`;
}

/**
 * 设置token
 * @param token
 */
export function setToken(token: string) {
	localStorage.setItem(TOKEN_KEY, token);
}

/**
 * 清除token
 */
export function clearToken() {
	localStorage.removeItem(TOKEN_KEY);
}

/**
 * 请求额外扩展配置
 */
export interface RequestConfig extends InternalAxiosRequestConfig {
	/**
	 * 同一个请求多次短时间请求，是否取消前面的请求，cancelKey标识是否为同一个请求
	 */
	cancelKey?: string | boolean;
	/**
	 * 是否需要缓存，同一个请求都是从缓存获取。默认为内存缓存，刷新界面就没有缓存
	 */
	cache?: boolean;
	/**
	 * 是否把接口返回的缓存存在 Local Storage
	 */
	local?: boolean;
	/**
	 * 是否显示错误信息
	 */
	noMsg?: boolean;
	/**
	 * 请求拦截器
	 */
	interceptors?: RequestInterceptors;
}

export interface Response<T = any> extends AxiosResponse<T, RequestConfig> {
	data: T;
	config: RequestConfig;
}

export interface RequestInterceptors {
	requestInterceptor?: (config: RequestConfig) => RequestConfig;
	requestInterceptorCatch?: (error: any) => any;
	responseInterceptor?: (config: Response<ResponseData>) => Response<ResponseData>;
	responseInterceptorCatch?: (error: any) => any;
}

export interface ResponseData {
	code: number;
	body?;
	data?;
	msg: string;
}

const errorMessages = (msg: string, showMsg = true) => {
	if (msg && showMsg) {
		pop.error(msg);
	}
	return msg;
};

/**
 * 请求取消的KeyMap，用于在请求配置里添加cancelKey: true | string，
 * 来控制重复请求，根据key取消在Pending状态下的请求；
 */
const cancelMap: Record<string, Canceler> = {};

export class Request {
	instance: AxiosInstance;
	interceptors?: RequestInterceptors;
	constructor(config: RequestConfig) {
		this.instance = axios.create(config);
		this.interceptors = config.interceptors;
		this.instance.interceptors.request.use(this.interceptors?.requestInterceptor, this.interceptors?.requestInterceptorCatch);
		this.instance.interceptors.response.use(this.interceptors?.responseInterceptor, this.interceptors?.responseInterceptorCatch);
	}

	/**
	 * 通用请求
	 * @param config
	 * @returns
	 */
	request<T = any>(config: Partial<RequestConfig>) {
		return this.instance.request<any, T>(config);
	}

	/**
	 * POST 请求
	 * @param url
	 * @param data
	 * @param config
	 * @returns
	 */
	post<T = any>(url: string, data?, config?: Partial<RequestConfig>) {
		return this.instance.post<any, T>(url, data, config);
	}

	/**
	 * GET请求
	 * @param url
	 * @param params
	 * @param config
	 * @returns
	 */
	get<T = any>(url: string, params?, config?: Partial<RequestConfig>) {
		return this.instance.get<any, T>(url, Object.assign({ params }, config));
	}

	/**
	 * 文件流请求并导出文件
	 * @param url
	 * @param params
	 * @param config
	 * @returns
	 */
	exportFile<T = any>(url: string, params?, config?: Partial<RequestConfig>) {
		return this.instance.get<any, T>(url, Object.assign({ params, responseType: 'arraybuffer' }, config));
	}

	/**
	 * 各子系统实现
	 */
	exitLogin() {}
}

function blobToFile(res: any) {
	const file = res.data as ArrayBuffer;
	const url = URL.createObjectURL(
		new Blob([file], {
			type: res.headers['content-type'],
		}),
	);
	const fileName = decodeURI(/=([\S]+)$/.exec(res.headers['content-disposition'])[1]).replace(`utf-8''`, '');
	downloadFileByUrl(url, `${fileName || '导出excel.xlsx'}`);
}

/**
 * 根据url下载路径
 * @param url
 * @param name
 */
export function downloadFileByUrl(url: string, name?: string) {
	if (!name) {
		const _url = new URL(url);
		name = _url.pathname.substring(_url.pathname.lastIndexOf('/') + 1);
	}
	const a = document.createElement('a');
	document.body.appendChild(a);
	a.href = `${url}`;
	a.download = name;
	a.target = '_blank';
	a.click();
	a.remove();
}

/**
 * 全局请求公共实例
 */
export const http = new Request({
	withCredentials: true,
	headers: {} as any,
	timeout: 50000,
	interceptors: {
		requestInterceptor: conf => {
			// 生成取消请求的 token/cancel
			conf.cancelToken = new axios.CancelToken(cancel => {
				if (conf?.cancelKey) {
					if (conf.cancelKey === true) {
						conf.cancelKey = conf.url;
					}
					if (cancelMap[conf.cancelKey]) {
						cancelMap[conf.cancelKey]();
					}
					cancelMap[conf.cancelKey] = cancel;
				}
			});
			// 添加国际化头部
			conf.headers['Accept-Language'] = localStorage.getItem('lang') || 'zh';
			const token = getToken();
			if (token) {
				conf.headers.Authorization = `Bearer ${token}`;
			}
			// get 请求加上随机数
			if (conf.method == 'get') {
				conf.params = {
					...conf.params,
				};
				if (!conf.cache && !conf.params.t) {
					conf.params.t = Date.now();
				}
			}

			const contentType = conf.headers['Content-Type'];
			if (Array.isArray(contentType) || isString(contentType)) {
				if (contentType.includes('application/x-www-form-urlencoded')) {
					conf.data = parseUrlParam(conf.data);
				}
			}

			if (conf.cache) {
				conf.adapter = cache({
					local: !!conf.local,
				});
			}
			return conf;
		},
		requestInterceptorCatch: error => {
			return Promise.reject(error);
		},
		responseInterceptor: res => {
			// 刷新token
			if (res.headers.authorization) {
				setToken(res.headers.authorization);
			}
			if (res.config?.cancelKey) {
				delete cancelMap[res.config.cancelKey as string];
			}
			const showMsg = !res.config.noMsg;
			const code = res.data.code || 200;
			// 获取错误信息
			const msg = res.data.msg;
			if (code === 401 || code === 402) {
				http.exitLogin();
				return Promise.reject('无效的操作，或者操作已过期，请重新登录。');
			} else if (res.data instanceof ArrayBuffer) {
				return blobToFile(res);
			} else if (code === 500) {
				showMsg && pop.warning(msg);
				return Promise.reject(res);
			} else if (code === 601) {
				showMsg && pop.warning(msg);
				return Promise.reject(new Error(msg));
			} else if (code !== 200) {
				showMsg && pop.err(msg);
				return Promise.reject(res);
			}
			if (res.data.body !== undefined) return res.data.body;
			if (res.data.data !== undefined) return res.data.data;
			return res.data;
		},
		responseInterceptorCatch: err => {
			if (err && err.response) {
				switch (err.response.status) {
					case 401:
						http.exitLogin();
						pop.warning('登录过期，请重新登录');
						break;
					default:
						break;
				}
			} else {
				// 处理其他情况
			}
			if (err && err.message && err.message !== 'canceled' && !err.hideMsg) {
				errorMessages(err.message);
			}
			return Promise.reject(err);
		},
	},
});

export default http;
