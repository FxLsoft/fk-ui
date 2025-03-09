import _IconCheck from './icon-check.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCheck = Object.assign(_IconCheck, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCheck.name, _IconCheck);
	},
});

export default IconCheck;
