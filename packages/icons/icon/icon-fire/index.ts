import _IconFire from './icon-fire.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFire = Object.assign(_IconFire, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFire.name, _IconFire);
	},
});

export default IconFire;
