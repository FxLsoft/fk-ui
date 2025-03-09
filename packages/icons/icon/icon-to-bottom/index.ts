import _IconToBottom from './icon-to-bottom.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconToBottom = Object.assign(_IconToBottom, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconToBottom.name, _IconToBottom);
	},
});

export default IconToBottom;
