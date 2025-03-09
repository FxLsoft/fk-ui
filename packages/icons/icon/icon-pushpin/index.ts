import _IconPushpin from './icon-pushpin.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPushpin = Object.assign(_IconPushpin, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPushpin.name, _IconPushpin);
	},
});

export default IconPushpin;
