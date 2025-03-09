import _IconEar from './icon-ear.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconEar = Object.assign(_IconEar, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconEar.name, _IconEar);
	},
});

export default IconEar;
