import _IconSortDescending from './icon-sort-descending.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSortDescending = Object.assign(_IconSortDescending, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSortDescending.name, _IconSortDescending);
	},
});

export default IconSortDescending;
