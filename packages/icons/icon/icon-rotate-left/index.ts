import _IconRotateLeft from './icon-rotate-left.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconRotateLeft = Object.assign(_IconRotateLeft, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconRotateLeft.name, _IconRotateLeft);
	},
});

export default IconRotateLeft;
