import _IconExclamationCircleFill from './icon-exclamation-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconExclamationCircleFill = Object.assign(_IconExclamationCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconExclamationCircleFill.name, _IconExclamationCircleFill);
	},
});

export default IconExclamationCircleFill;
