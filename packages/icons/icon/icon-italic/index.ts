import _IconItalic from './icon-italic.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconItalic = Object.assign(_IconItalic, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconItalic.name, _IconItalic);
	},
});

export default IconItalic;
