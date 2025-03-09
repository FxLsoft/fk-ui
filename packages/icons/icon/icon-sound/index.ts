import _IconSound from './icon-sound.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSound = Object.assign(_IconSound, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSound.name, _IconSound);
	},
});

export default IconSound;
