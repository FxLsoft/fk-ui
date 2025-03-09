import _IconAlipayCircle from './icon-alipay-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconAlipayCircle = Object.assign(_IconAlipayCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconAlipayCircle.name, _IconAlipayCircle);
	},
});

export default IconAlipayCircle;
