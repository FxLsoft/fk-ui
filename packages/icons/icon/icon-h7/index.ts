import _IconH7 from './icon-h7.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconH7 = Object.assign(_IconH7, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconH7.name, _IconH7);
	},
});

export default IconH7;
