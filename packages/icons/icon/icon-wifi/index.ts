import _IconWifi from './icon-wifi.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconWifi = Object.assign(_IconWifi, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconWifi.name, _IconWifi);
	},
});

export default IconWifi;
