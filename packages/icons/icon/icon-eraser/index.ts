import _IconEraser from './icon-eraser.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconEraser = Object.assign(_IconEraser, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconEraser.name, _IconEraser);
	},
});

export default IconEraser;
