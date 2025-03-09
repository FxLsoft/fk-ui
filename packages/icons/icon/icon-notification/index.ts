import _IconNotification from './icon-notification.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconNotification = Object.assign(_IconNotification, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconNotification.name, _IconNotification);
	},
});

export default IconNotification;
