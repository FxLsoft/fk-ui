import _IconH5 from './icon-h5.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconH5 = Object.assign(_IconH5, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconH5.name, _IconH5);
	},
});

export default IconH5;
