import _IconDesktop from './icon-desktop.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDesktop = Object.assign(_IconDesktop, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDesktop.name, _IconDesktop);
	},
});

export default IconDesktop;
