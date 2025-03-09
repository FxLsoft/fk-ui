import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Calendar from './calendar';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Calendar = Object.assign(_Calendar, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Calendar.name, _Calendar);
	},
});

export type CalendarInstance = InstanceType<typeof _Calendar>;

export default Calendar;
