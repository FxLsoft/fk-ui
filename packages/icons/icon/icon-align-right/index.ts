import _IconAlignRight from './icon-align-right.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconAlignRight = Object.assign(_IconAlignRight, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconAlignRight.name, _IconAlignRight);
	},
});

export default IconAlignRight;
