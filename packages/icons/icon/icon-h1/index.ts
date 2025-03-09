import _IconH1 from './icon-h1.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconH1 = Object.assign(_IconH1, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconH1.name, _IconH1);
	},
});

export default IconH1;
