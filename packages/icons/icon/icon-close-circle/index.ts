import _IconCloseCircle from './icon-close-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCloseCircle = Object.assign(_IconCloseCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCloseCircle.name, _IconCloseCircle);
	},
});

export default IconCloseCircle;
