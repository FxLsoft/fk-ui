import _IconImport from './icon-import.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconImport = Object.assign(_IconImport, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconImport.name, _IconImport);
	},
});

export default IconImport;
