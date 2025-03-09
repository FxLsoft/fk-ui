import _IconLock from './icon-lock.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLock = Object.assign(_IconLock, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLock.name, _IconLock);
	},
});

export default IconLock;
