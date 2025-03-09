import _IconRecord from './icon-record.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconRecord = Object.assign(_IconRecord, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconRecord.name, _IconRecord);
	},
});

export default IconRecord;
