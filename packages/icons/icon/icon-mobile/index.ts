import _IconMobile from './icon-mobile.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMobile = Object.assign(_IconMobile, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMobile.name, _IconMobile);
	},
});

export default IconMobile;
