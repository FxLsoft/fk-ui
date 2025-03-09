import _IconFileAudio from './icon-file-audio.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFileAudio = Object.assign(_IconFileAudio, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFileAudio.name, _IconFileAudio);
	},
});

export default IconFileAudio;
