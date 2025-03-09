import _IconTwitterCircleFill from './icon-twitter-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconTwitterCircleFill = Object.assign(_IconTwitterCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconTwitterCircleFill.name, _IconTwitterCircleFill);
	},
});

export default IconTwitterCircleFill;
