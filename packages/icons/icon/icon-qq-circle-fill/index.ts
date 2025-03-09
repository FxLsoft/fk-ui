import _IconQqCircleFill from './icon-qq-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconQqCircleFill = Object.assign(_IconQqCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconQqCircleFill.name, _IconQqCircleFill);
	},
});

export default IconQqCircleFill;
