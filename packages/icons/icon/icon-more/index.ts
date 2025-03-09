import _IconMore from './icon-more.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMore = Object.assign(_IconMore, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMore.name, _IconMore);
	},
});

export default IconMore;
