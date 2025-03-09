import _IconDown from './icon-down.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDown = Object.assign(_IconDown, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDown.name, _IconDown);
	},
});

export default IconDown;
