import _IconDoubleLeft from './icon-double-left.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDoubleLeft = Object.assign(_IconDoubleLeft, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDoubleLeft.name, _IconDoubleLeft);
	},
});

export default IconDoubleLeft;
