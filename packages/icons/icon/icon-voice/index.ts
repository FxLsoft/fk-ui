import _IconVoice from './icon-voice.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconVoice = Object.assign(_IconVoice, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconVoice.name, _IconVoice);
	},
});

export default IconVoice;
