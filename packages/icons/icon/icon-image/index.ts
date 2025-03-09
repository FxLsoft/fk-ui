import _IconImage from './icon-image.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconImage = Object.assign(_IconImage, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconImage.name, _IconImage);
	},
});

export default IconImage;
