import _IconSoundFill from './icon-sound-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSoundFill = Object.assign(_IconSoundFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSoundFill.name, _IconSoundFill);
	},
});

export default IconSoundFill;
