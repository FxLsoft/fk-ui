import _IconToTop from './icon-to-top.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconToTop = Object.assign(_IconToTop, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconToTop.name, _IconToTop);
	},
});

export default IconToTop;
