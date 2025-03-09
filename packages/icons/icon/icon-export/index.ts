import _IconExport from './icon-export.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconExport = Object.assign(_IconExport, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconExport.name, _IconExport);
	},
});

export default IconExport;
