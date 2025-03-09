import _IconFullscreenExit from './icon-fullscreen-exit.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFullscreenExit = Object.assign(_IconFullscreenExit, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFullscreenExit.name, _IconFullscreenExit);
	},
});

export default IconFullscreenExit;
