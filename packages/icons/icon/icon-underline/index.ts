import _IconUnderline from './icon-underline.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconUnderline = Object.assign(_IconUnderline, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconUnderline.name, _IconUnderline);
	},
});

export default IconUnderline;
