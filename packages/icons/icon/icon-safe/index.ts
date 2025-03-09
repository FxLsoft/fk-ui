import _IconSafe from './icon-safe.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSafe = Object.assign(_IconSafe, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSafe.name, _IconSafe);
	},
});

export default IconSafe;
