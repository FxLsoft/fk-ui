import _IconH6 from './icon-h6.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconH6 = Object.assign(_IconH6, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconH6.name, _IconH6);
	},
});

export default IconH6;
