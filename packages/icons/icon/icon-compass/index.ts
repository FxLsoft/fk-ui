import _IconCompass from './icon-compass.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCompass = Object.assign(_IconCompass, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCompass.name, _IconCompass);
	},
});

export default IconCompass;
