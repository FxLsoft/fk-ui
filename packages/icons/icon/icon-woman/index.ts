import _IconWoman from './icon-woman.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconWoman = Object.assign(_IconWoman, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconWoman.name, _IconWoman);
	},
});

export default IconWoman;
