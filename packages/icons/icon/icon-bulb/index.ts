import _IconBulb from './icon-bulb.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconBulb = Object.assign(_IconBulb, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconBulb.name, _IconBulb);
	},
});

export default IconBulb;
