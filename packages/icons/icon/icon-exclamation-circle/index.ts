import _IconExclamationCircle from './icon-exclamation-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconExclamationCircle = Object.assign(_IconExclamationCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconExclamationCircle.name, _IconExclamationCircle);
	},
});

export default IconExclamationCircle;
