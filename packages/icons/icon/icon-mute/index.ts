import _IconMute from './icon-mute.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMute = Object.assign(_IconMute, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMute.name, _IconMute);
	},
});

export default IconMute;
