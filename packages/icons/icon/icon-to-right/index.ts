import _IconToRight from './icon-to-right.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconToRight = Object.assign(_IconToRight, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconToRight.name, _IconToRight);
	},
});

export default IconToRight;
