import _IconCopyright from './icon-copyright.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCopyright = Object.assign(_IconCopyright, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCopyright.name, _IconCopyright);
	},
});

export default IconCopyright;
