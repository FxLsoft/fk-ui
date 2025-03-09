import _IconRotateRight from './icon-rotate-right.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconRotateRight = Object.assign(_IconRotateRight, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconRotateRight.name, _IconRotateRight);
	},
});

export default IconRotateRight;
