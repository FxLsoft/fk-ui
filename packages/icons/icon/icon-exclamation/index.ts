import _IconExclamation from './icon-exclamation.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconExclamation = Object.assign(_IconExclamation, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconExclamation.name, _IconExclamation);
	},
});

export default IconExclamation;
