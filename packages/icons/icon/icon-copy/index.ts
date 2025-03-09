import _IconCopy from './icon-copy.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCopy = Object.assign(_IconCopy, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCopy.name, _IconCopy);
	},
});

export default IconCopy;
