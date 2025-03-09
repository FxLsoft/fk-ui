import _IconStorage from './icon-storage.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconStorage = Object.assign(_IconStorage, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconStorage.name, _IconStorage);
	},
});

export default IconStorage;
