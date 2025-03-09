import _IconDoubleUp from './icon-double-up.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDoubleUp = Object.assign(_IconDoubleUp, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDoubleUp.name, _IconDoubleUp);
	},
});

export default IconDoubleUp;
