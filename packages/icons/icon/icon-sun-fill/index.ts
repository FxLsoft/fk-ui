import _IconSunFill from './icon-sun-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSunFill = Object.assign(_IconSunFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSunFill.name, _IconSunFill);
	},
});

export default IconSunFill;
