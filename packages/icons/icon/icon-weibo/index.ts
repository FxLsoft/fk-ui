import _IconWeibo from './icon-weibo.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconWeibo = Object.assign(_IconWeibo, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconWeibo.name, _IconWeibo);
	},
});

export default IconWeibo;
