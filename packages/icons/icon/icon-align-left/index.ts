import _IconAlignLeft from './icon-align-left.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconAlignLeft = Object.assign(_IconAlignLeft, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconAlignLeft.name, _IconAlignLeft);
	},
});

export default IconAlignLeft;
