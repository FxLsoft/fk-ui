import _IconSubscribed from './icon-subscribed.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSubscribed = Object.assign(_IconSubscribed, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSubscribed.name, _IconSubscribed);
	},
});

export default IconSubscribed;
