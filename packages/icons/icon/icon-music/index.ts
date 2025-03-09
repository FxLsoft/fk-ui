import _IconMusic from './icon-music.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMusic = Object.assign(_IconMusic, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMusic.name, _IconMusic);
	},
});

export default IconMusic;
