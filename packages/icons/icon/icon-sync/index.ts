import _IconSync from './icon-sync.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSync = Object.assign(_IconSync, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSync.name, _IconSync);
	},
});

export default IconSync;
