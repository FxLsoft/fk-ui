import _IconSelectAll from './icon-select-all.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSelectAll = Object.assign(_IconSelectAll, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSelectAll.name, _IconSelectAll);
	},
});

export default IconSelectAll;
