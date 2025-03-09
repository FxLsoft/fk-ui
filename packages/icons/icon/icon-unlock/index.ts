import _IconUnlock from './icon-unlock.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconUnlock = Object.assign(_IconUnlock, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconUnlock.name, _IconUnlock);
	},
});

export default IconUnlock;
