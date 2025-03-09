import _IconStar from './icon-star.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconStar = Object.assign(_IconStar, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconStar.name, _IconStar);
	},
});

export default IconStar;
