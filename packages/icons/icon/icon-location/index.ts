import _IconLocation from './icon-location.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLocation = Object.assign(_IconLocation, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLocation.name, _IconLocation);
	},
});

export default IconLocation;
