import _IconPenFill from './icon-pen-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPenFill = Object.assign(_IconPenFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPenFill.name, _IconPenFill);
	},
});

export default IconPenFill;
