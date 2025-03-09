import _IconCheckCircleFill from './icon-check-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCheckCircleFill = Object.assign(_IconCheckCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCheckCircleFill.name, _IconCheckCircleFill);
	},
});

export default IconCheckCircleFill;
