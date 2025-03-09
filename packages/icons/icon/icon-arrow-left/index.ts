import _IconArrowLeft from './icon-arrow-left.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconArrowLeft = Object.assign(_IconArrowLeft, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconArrowLeft.name, _IconArrowLeft);
	},
});

export default IconArrowLeft;
