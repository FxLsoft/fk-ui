import _IconGoogle from './icon-google.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconGoogle = Object.assign(_IconGoogle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconGoogle.name, _IconGoogle);
	},
});

export default IconGoogle;
