import _IconInfoCircle from './icon-info-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconInfoCircle = Object.assign(_IconInfoCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconInfoCircle.name, _IconInfoCircle);
	},
});

export default IconInfoCircle;
