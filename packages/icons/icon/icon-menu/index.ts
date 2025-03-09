import _IconMenu from './icon-menu.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMenu = Object.assign(_IconMenu, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMenu.name, _IconMenu);
	},
});

export default IconMenu;
