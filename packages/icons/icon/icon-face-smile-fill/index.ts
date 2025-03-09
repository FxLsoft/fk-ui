import _IconFaceSmileFill from './icon-face-smile-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFaceSmileFill = Object.assign(_IconFaceSmileFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFaceSmileFill.name, _IconFaceSmileFill);
	},
});

export default IconFaceSmileFill;
