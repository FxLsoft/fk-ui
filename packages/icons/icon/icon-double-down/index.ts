import _IconDoubleDown from './icon-double-down.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDoubleDown = Object.assign(_IconDoubleDown, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDoubleDown.name, _IconDoubleDown);
	},
});

export default IconDoubleDown;
