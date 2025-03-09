import _IconWechatpay from './icon-wechatpay.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconWechatpay = Object.assign(_IconWechatpay, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconWechatpay.name, _IconWechatpay);
	},
});

export default IconWechatpay;
