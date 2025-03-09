import _IconCheckCircle from './icon-check-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCheckCircle = Object.assign(_IconCheckCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCheckCircle.name, _IconCheckCircle);
	},
});

export default IconCheckCircle;
