import _IconPause from './icon-pause.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPause = Object.assign(_IconPause, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPause.name, _IconPause);
	},
});

export default IconPause;
