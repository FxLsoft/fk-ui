import _IconStop from './icon-stop.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconStop = Object.assign(_IconStop, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconStop.name, _IconStop);
	},
});

export default IconStop;
