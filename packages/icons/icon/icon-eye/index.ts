import _IconEye from './icon-eye.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconEye = Object.assign(_IconEye, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconEye.name, _IconEye);
	},
});

export default IconEye;
