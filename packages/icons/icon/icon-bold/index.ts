import _IconBold from './icon-bold.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconBold = Object.assign(_IconBold, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconBold.name, _IconBold);
	},
});

export default IconBold;
