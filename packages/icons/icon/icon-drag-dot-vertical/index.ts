import _IconDragDotVertical from './icon-drag-dot-vertical.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDragDotVertical = Object.assign(_IconDragDotVertical, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDragDotVertical.name, _IconDragDotVertical);
	},
});

export default IconDragDotVertical;
