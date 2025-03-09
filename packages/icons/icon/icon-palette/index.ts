import _IconPalette from './icon-palette.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPalette = Object.assign(_IconPalette, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPalette.name, _IconPalette);
	},
});

export default IconPalette;
