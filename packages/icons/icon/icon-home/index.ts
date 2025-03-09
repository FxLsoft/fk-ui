import _IconHome from './icon-home.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconHome = Object.assign(_IconHome, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconHome.name, _IconHome);
	},
});

export default IconHome;
