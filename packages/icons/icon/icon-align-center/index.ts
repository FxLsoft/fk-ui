import _IconAlignCenter from './icon-align-center.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconAlignCenter = Object.assign(_IconAlignCenter, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconAlignCenter.name, _IconAlignCenter);
	},
});

export default IconAlignCenter;
