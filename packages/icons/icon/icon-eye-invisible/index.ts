import _IconEyeInvisible from './icon-eye-invisible.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconEyeInvisible = Object.assign(_IconEyeInvisible, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconEyeInvisible.name, _IconEyeInvisible);
	},
});

export default IconEyeInvisible;
