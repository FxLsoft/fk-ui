import _IconShareAlt from './icon-share-alt.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconShareAlt = Object.assign(_IconShareAlt, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconShareAlt.name, _IconShareAlt);
	},
});

export default IconShareAlt;
