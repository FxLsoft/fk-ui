import _IconShareExternal from './icon-share-external.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconShareExternal = Object.assign(_IconShareExternal, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconShareExternal.name, _IconShareExternal);
	},
});

export default IconShareExternal;
