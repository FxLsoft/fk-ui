import _IconLayers from './icon-layers.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLayers = Object.assign(_IconLayers, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLayers.name, _IconLayers);
	},
});

export default IconLayers;
