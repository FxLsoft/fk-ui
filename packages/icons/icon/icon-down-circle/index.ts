import _IconDownCircle from './icon-down-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDownCircle = Object.assign(_IconDownCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDownCircle.name, _IconDownCircle);
	},
});

export default IconDownCircle;
