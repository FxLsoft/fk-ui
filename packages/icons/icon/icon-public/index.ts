import _IconPublic from './icon-public.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPublic = Object.assign(_IconPublic, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPublic.name, _IconPublic);
	},
});

export default IconPublic;
