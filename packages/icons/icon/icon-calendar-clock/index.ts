import _IconCalendarClock from './icon-calendar-clock.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCalendarClock = Object.assign(_IconCalendarClock, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCalendarClock.name, _IconCalendarClock);
	},
});

export default IconCalendarClock;
