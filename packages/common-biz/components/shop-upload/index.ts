import { getComponentPrefix } from '@erp/common';
import _Component from './shop-upload';
import './style.less';
import type { App } from 'vue';

export const ShopUpload = Object.assign(_Component, {
	install: (app: App, options) => {
		const componentPrefix = getComponentPrefix(options);
		app.component(componentPrefix + _Component.name, _Component);
	},
});

export type ShopUploadInstance = InstanceType<typeof _Component>;

export default ShopUpload;
