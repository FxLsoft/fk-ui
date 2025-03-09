import _IconPauseCircle from './icon-pause-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPauseCircle = Object.assign(_IconPauseCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPauseCircle.name, _IconPauseCircle);
	},
});

export default IconPauseCircle;
