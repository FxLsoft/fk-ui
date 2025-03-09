import _IconArrowDown from './icon-arrow-down.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconArrowDown = Object.assign(_IconArrowDown, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconArrowDown.name, _IconArrowDown);
	},
});

export default IconArrowDown;
