import _IconToLeft from './icon-to-left.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconToLeft = Object.assign(_IconToLeft, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconToLeft.name, _IconToLeft);
	},
});

export default IconToLeft;
