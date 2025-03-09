import _IconRight from './icon-right.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconRight = Object.assign(_IconRight, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconRight.name, _IconRight);
	},
});

export default IconRight;
