import XEUtils from 'xe-utils';
import type { VxeGlobalMenus } from '../../types';

class VXEMenusStore {
	private store: any = {};

	mixin(options: any): VXEMenusStore {
		XEUtils.each(options, (item, key) => {
			this.add(key, item);
		});
		return this;
	}

	has(name: string): boolean {
		return !!this.get(name);
	}

	get(name: string): any {
		return this.store[name];
	}

	add(name: string, render: any): VXEMenusStore {
		const conf = this.store[name];
		// 兼容
		if (XEUtils.isFunction(render)) {
			render = {
				menuMethod: render,
			};
		}

		// 检测是否覆盖
		this.store[name] = conf ? XEUtils.merge(conf, render) : render;
		return this;
	}

	delete(name: string): void {
		delete this.store[name];
	}

	forEach(callback: any): void {
		XEUtils.objectEach(this.store, callback);
	}
}

export const menus = new VXEMenusStore() as VxeGlobalMenus;
