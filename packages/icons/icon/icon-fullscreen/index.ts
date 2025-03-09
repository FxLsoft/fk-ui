import _IconFullscreen from './icon-fullscreen.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFullscreen = Object.assign(_IconFullscreen, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFullscreen.name, _IconFullscreen);
	},
});

export default IconFullscreen;
