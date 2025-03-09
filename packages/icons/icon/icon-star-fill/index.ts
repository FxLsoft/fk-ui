import _IconStarFill from './icon-star-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconStarFill = Object.assign(_IconStarFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconStarFill.name, _IconStarFill);
	},
});

export default IconStarFill;
