import _IconLaunch from './icon-launch.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLaunch = Object.assign(_IconLaunch, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLaunch.name, _IconLaunch);
	},
});

export default IconLaunch;
