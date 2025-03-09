import _IconCodepen from './icon-codepen.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCodepen = Object.assign(_IconCodepen, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCodepen.name, _IconCodepen);
	},
});

export default IconCodepen;
