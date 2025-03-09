import _IconOrderedList from './icon-ordered-list.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconOrderedList = Object.assign(_IconOrderedList, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconOrderedList.name, _IconOrderedList);
	},
});

export default IconOrderedList;
