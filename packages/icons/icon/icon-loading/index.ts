import _IconLoading from './icon-loading.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLoading = Object.assign(_IconLoading, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLoading.name, _IconLoading);
	},
});

export default IconLoading;
