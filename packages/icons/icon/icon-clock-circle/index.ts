import _IconClockCircle from './icon-clock-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconClockCircle = Object.assign(_IconClockCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconClockCircle.name, _IconClockCircle);
	},
});

export default IconClockCircle;
