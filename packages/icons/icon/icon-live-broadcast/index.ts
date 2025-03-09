import _IconLiveBroadcast from './icon-live-broadcast.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLiveBroadcast = Object.assign(_IconLiveBroadcast, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLiveBroadcast.name, _IconLiveBroadcast);
	},
});

export default IconLiveBroadcast;
