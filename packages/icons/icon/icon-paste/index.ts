import _IconPaste from './icon-paste.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPaste = Object.assign(_IconPaste, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPaste.name, _IconPaste);
	},
});

export default IconPaste;
