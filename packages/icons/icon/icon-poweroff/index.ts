import _IconPoweroff from './icon-poweroff.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPoweroff = Object.assign(_IconPoweroff, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPoweroff.name, _IconPoweroff);
	},
});

export default IconPoweroff;
