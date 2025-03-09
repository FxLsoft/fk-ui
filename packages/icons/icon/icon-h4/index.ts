import _IconH4 from './icon-h4.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconH4 = Object.assign(_IconH4, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconH4.name, _IconH4);
	},
});

export default IconH4;
