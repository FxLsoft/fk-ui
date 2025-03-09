import _IconZoomIn from './icon-zoom-in.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconZoomIn = Object.assign(_IconZoomIn, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconZoomIn.name, _IconZoomIn);
	},
});

export default IconZoomIn;
