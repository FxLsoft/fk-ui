import _IconDoubleRight from './icon-double-right.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDoubleRight = Object.assign(_IconDoubleRight, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDoubleRight.name, _IconDoubleRight);
	},
});

export default IconDoubleRight;
