import XEUtils from 'xe-utils';
import type { VxeGlobalInterceptor, VxeGlobalInterceptorHandles } from '../../types';

const storeMap: { [type: string]: VxeGlobalInterceptorHandles.InterceptorCallback[] } = {};

export const interceptor: VxeGlobalInterceptor = {
	mixin(options) {
		XEUtils.each(options, (render, type) => {
			interceptor.add(type, render);
		});
		return interceptor;
	},
	get(type) {
		return storeMap[type] || [];
	},
	add(type, render) {
		// 兼容
		if (XEUtils.isFunction(render)) {
			render = {
				tableInterceptorMethod: render,
			};
		}
		const callback = render.tableInterceptorMethod;

		if (callback) {
			let eList = storeMap[type];
			if (!eList) {
				eList = storeMap[type] = [];
			}

			// 检测重复

			eList.push(callback);
		}
		return interceptor;
	},
	delete(type, render) {
		const eList = storeMap[type];
		if (eList) {
			// 兼容
			if (XEUtils.isFunction(render)) {
				render = {
					tableInterceptorMethod: render,
				};
			}
			const callback = render ? render.tableInterceptorMethod : null;

			if (callback) {
				XEUtils.remove(eList, fn => fn === callback);
			} else {
				delete storeMap[type];
			}
		}
	},
};
