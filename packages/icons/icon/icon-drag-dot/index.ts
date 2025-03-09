import _IconDragDot from './icon-drag-dot.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDragDot = Object.assign(_IconDragDot, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDragDot.name, _IconDragDot);
	},
});

export default IconDragDot;
