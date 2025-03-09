import _IconPauseCircleFill from './icon-pause-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPauseCircleFill = Object.assign(_IconPauseCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPauseCircleFill.name, _IconPauseCircleFill);
	},
});

export default IconPauseCircleFill;
