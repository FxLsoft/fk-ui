import _IconPlayCircleFill from './icon-play-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPlayCircleFill = Object.assign(_IconPlayCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPlayCircleFill.name, _IconPlayCircleFill);
	},
});

export default IconPlayCircleFill;
