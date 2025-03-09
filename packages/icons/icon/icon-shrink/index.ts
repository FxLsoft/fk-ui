import _IconShrink from './icon-shrink.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconShrink = Object.assign(_IconShrink, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconShrink.name, _IconShrink);
	},
});

export default IconShrink;
