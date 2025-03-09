import _IconSun from './icon-sun.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSun = Object.assign(_IconSun, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSun.name, _IconSun);
	},
});

export default IconSun;
