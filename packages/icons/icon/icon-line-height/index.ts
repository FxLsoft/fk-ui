import _IconLineHeight from './icon-line-height.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLineHeight = Object.assign(_IconLineHeight, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLineHeight.name, _IconLineHeight);
	},
});

export default IconLineHeight;
