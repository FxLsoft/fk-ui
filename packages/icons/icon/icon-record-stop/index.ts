import _IconRecordStop from './icon-record-stop.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconRecordStop = Object.assign(_IconRecordStop, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconRecordStop.name, _IconRecordStop);
	},
});

export default IconRecordStop;
