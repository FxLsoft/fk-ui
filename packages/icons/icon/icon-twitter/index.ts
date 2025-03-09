import _IconTwitter from './icon-twitter.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconTwitter = Object.assign(_IconTwitter, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconTwitter.name, _IconTwitter);
	},
});

export default IconTwitter;
