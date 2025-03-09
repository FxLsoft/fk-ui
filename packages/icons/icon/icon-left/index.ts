import _IconLeft from './icon-left.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLeft = Object.assign(_IconLeft, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLeft.name, _IconLeft);
	},
});

export default IconLeft;
