import _IconVideoCamera from './icon-video-camera.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconVideoCamera = Object.assign(_IconVideoCamera, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconVideoCamera.name, _IconVideoCamera);
	},
});

export default IconVideoCamera;
