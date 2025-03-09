import _IconPlayCircle from './icon-play-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPlayCircle = Object.assign(_IconPlayCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPlayCircle.name, _IconPlayCircle);
	},
});

export default IconPlayCircle;
