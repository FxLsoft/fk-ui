import _IconCloseCircleFill from './icon-close-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCloseCircleFill = Object.assign(_IconCloseCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCloseCircleFill.name, _IconCloseCircleFill);
	},
});

export default IconCloseCircleFill;
