import _IconMessageBanned from './icon-message-banned.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMessageBanned = Object.assign(_IconMessageBanned, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMessageBanned.name, _IconMessageBanned);
	},
});

export default IconMessageBanned;
