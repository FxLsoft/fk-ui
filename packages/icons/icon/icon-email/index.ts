import _IconEmail from './icon-email.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconEmail = Object.assign(_IconEmail, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconEmail.name, _IconEmail);
	},
});

export default IconEmail;
