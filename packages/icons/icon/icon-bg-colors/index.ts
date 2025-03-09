import _IconBgColors from './icon-bg-colors.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconBgColors = Object.assign(_IconBgColors, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconBgColors.name, _IconBgColors);
	},
});

export default IconBgColors;
