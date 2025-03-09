import _IconSearch from './icon-search.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSearch = Object.assign(_IconSearch, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSearch.name, _IconSearch);
	},
});

export default IconSearch;
