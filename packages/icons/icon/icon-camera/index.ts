import _IconCamera from './icon-camera.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCamera = Object.assign(_IconCamera, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCamera.name, _IconCamera);
	},
});

export default IconCamera;
