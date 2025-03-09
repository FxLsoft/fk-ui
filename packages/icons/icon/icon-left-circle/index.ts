import _IconLeftCircle from './icon-left-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLeftCircle = Object.assign(_IconLeftCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLeftCircle.name, _IconLeftCircle);
	},
});

export default IconLeftCircle;
