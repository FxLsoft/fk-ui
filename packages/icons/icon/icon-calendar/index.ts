import _IconCalendar from './icon-calendar.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCalendar = Object.assign(_IconCalendar, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCalendar.name, _IconCalendar);
	},
});

export default IconCalendar;
