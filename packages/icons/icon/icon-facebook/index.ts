import _IconFacebook from './icon-facebook.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFacebook = Object.assign(_IconFacebook, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFacebook.name, _IconFacebook);
	},
});

export default IconFacebook;
