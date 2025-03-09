import _IconMessage from './icon-message.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMessage = Object.assign(_IconMessage, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMessage.name, _IconMessage);
	},
});

export default IconMessage;
