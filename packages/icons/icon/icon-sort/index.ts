import _IconSort from './icon-sort.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSort = Object.assign(_IconSort, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSort.name, _IconSort);
	},
});

export default IconSort;
