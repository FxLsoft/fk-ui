import _IconApps from './icon-apps.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconApps = Object.assign(_IconApps, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconApps.name, _IconApps);
	},
});

export default IconApps;
