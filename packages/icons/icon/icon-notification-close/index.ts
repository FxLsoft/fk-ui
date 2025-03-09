import _IconNotificationClose from './icon-notification-close.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconNotificationClose = Object.assign(_IconNotificationClose, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconNotificationClose.name, _IconNotificationClose);
	},
});

export default IconNotificationClose;
