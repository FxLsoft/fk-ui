import _IconFilter from './icon-filter.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFilter = Object.assign(_IconFilter, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFilter.name, _IconFilter);
	},
});

export default IconFilter;
