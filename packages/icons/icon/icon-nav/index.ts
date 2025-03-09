import _IconNav from './icon-nav.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconNav = Object.assign(_IconNav, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconNav.name, _IconNav);
	},
});

export default IconNav;
