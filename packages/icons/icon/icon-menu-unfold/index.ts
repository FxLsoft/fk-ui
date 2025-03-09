import _IconMenuUnfold from './icon-menu-unfold.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMenuUnfold = Object.assign(_IconMenuUnfold, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMenuUnfold.name, _IconMenuUnfold);
	},
});

export default IconMenuUnfold;
