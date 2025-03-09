import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _TimePicker from './time-picker.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const TimePicker = Object.assign(_TimePicker, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _TimePicker.name, _TimePicker);
	},
});

export type TimePickerInstance = InstanceType<typeof _TimePicker>;

export default TimePicker;
