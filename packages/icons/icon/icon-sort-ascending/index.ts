import _IconSortAscending from './icon-sort-ascending.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSortAscending = Object.assign(_IconSortAscending, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSortAscending.name, _IconSortAscending);
	},
});

export default IconSortAscending;
