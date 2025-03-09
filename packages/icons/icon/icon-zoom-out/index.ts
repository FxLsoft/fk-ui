import _IconZoomOut from './icon-zoom-out.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconZoomOut = Object.assign(_IconZoomOut, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconZoomOut.name, _IconZoomOut);
	},
});

export default IconZoomOut;
