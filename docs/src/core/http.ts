import { omitBy } from 'lodash-es';
import { clearToken, http } from '@erp/biz';
import { setEncrypt } from '../utils/encrypt';
import { BASE_URL } from './constant';

http.instance.defaults.baseURL = BASE_URL;

http.exitLogin = function () {
	clearToken();
	// 退出登录
	location.href = `https://test.main.fukerp.com/login?jumpTo=${encodeURIComponent(location.origin)}`;
};

/**
 * 参数加密
 */
http.instance.interceptors.request.use(conf => {
	const data = conf.data || conf.params || {};
	const params = {
		sign: setEncrypt(omitBy(data, (value, key) => value === undefined || value === null)),
		submitData: omitBy(data, (value, key) => value === undefined || value === null),
	};
	if (conf.method == 'post') {
		conf.data = params;
	} else if (conf.method == 'get') {
		conf.params = params;
	}
	return conf;
});

export default http;
