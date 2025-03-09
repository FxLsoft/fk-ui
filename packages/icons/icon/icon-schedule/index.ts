import _IconSchedule from './icon-schedule.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSchedule = Object.assign(_IconSchedule, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSchedule.name, _IconSchedule);
	},
});

export default IconSchedule;
