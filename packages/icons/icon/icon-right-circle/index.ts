import _IconRightCircle from './icon-right-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconRightCircle = Object.assign(_IconRightCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconRightCircle.name, _IconRightCircle);
	},
});

export default IconRightCircle;
