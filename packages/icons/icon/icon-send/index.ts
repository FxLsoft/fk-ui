import _IconSend from './icon-send.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSend = Object.assign(_IconSend, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSend.name, _IconSend);
	},
});

export default IconSend;
