import _IconUnorderedList from './icon-unordered-list.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconUnorderedList = Object.assign(_IconUnorderedList, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconUnorderedList.name, _IconUnorderedList);
	},
});

export default IconUnorderedList;
