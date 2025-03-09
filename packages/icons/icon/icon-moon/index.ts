import _IconMoon from './icon-moon.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMoon = Object.assign(_IconMoon, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMoon.name, _IconMoon);
	},
});

export default IconMoon;
