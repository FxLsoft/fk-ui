import _IconMenuFold from './icon-menu-fold.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMenuFold = Object.assign(_IconMenuFold, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMenuFold.name, _IconMenuFold);
	},
});

export default IconMenuFold;
