import _IconShareInternal from './icon-share-internal.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconShareInternal = Object.assign(_IconShareInternal, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconShareInternal.name, _IconShareInternal);
	},
});

export default IconShareInternal;
