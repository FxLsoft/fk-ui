import _IconList from './icon-list.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconList = Object.assign(_IconList, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconList.name, _IconList);
	},
});

export default IconList;
