import _IconH3 from './icon-h3.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconH3 = Object.assign(_IconH3, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconH3.name, _IconH3);
	},
});

export default IconH3;
