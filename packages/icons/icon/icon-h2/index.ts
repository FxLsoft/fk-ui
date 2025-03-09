import _IconH2 from './icon-h2.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconH2 = Object.assign(_IconH2, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconH2.name, _IconH2);
	},
});

export default IconH2;
