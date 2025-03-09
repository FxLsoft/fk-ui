import _IconArrowRight from './icon-arrow-right.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconArrowRight = Object.assign(_IconArrowRight, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconArrowRight.name, _IconArrowRight);
	},
});

export default IconArrowRight;
