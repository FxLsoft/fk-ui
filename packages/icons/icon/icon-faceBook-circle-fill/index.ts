import _IconFaceBookCircleFill from './icon-faceBook-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFaceBookCircleFill = Object.assign(_IconFaceBookCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFaceBookCircleFill.name, _IconFaceBookCircleFill);
	},
});

export default IconFaceBookCircleFill;
