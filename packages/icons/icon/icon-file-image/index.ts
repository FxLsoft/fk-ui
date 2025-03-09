import _IconFileImage from './icon-file-image.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFileImage = Object.assign(_IconFileImage, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFileImage.name, _IconFileImage);
	},
});

export default IconFileImage;
