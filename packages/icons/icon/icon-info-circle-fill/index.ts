import _IconInfoCircleFill from './icon-info-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconInfoCircleFill = Object.assign(_IconInfoCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconInfoCircleFill.name, _IconInfoCircleFill);
	},
});

export default IconInfoCircleFill;
