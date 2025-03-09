import _IconGoogleCircleFill from './icon-google-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconGoogleCircleFill = Object.assign(_IconGoogleCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconGoogleCircleFill.name, _IconGoogleCircleFill);
	},
});

export default IconGoogleCircleFill;
