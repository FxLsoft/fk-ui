import _IconCommon from './icon-common.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCommon = Object.assign(_IconCommon, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCommon.name, _IconCommon);
	},
});

export default IconCommon;
