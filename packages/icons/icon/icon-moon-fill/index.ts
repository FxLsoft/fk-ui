import _IconMoonFill from './icon-moon-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMoonFill = Object.assign(_IconMoonFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMoonFill.name, _IconMoonFill);
	},
});

export default IconMoonFill;
