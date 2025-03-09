import _IconFontColors from './icon-font-colors.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFontColors = Object.assign(_IconFontColors, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFontColors.name, _IconFontColors);
	},
});

export default IconFontColors;
