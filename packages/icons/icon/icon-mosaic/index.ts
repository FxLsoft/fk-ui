import _IconMosaic from './icon-mosaic.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMosaic = Object.assign(_IconMosaic, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMosaic.name, _IconMosaic);
	},
});

export default IconMosaic;
