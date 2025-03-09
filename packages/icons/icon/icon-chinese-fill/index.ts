import _IconChineseFill from './icon-chinese-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconChineseFill = Object.assign(_IconChineseFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconChineseFill.name, _IconChineseFill);
	},
});

export default IconChineseFill;
