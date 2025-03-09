import _IconDragArrow from './icon-drag-arrow.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDragArrow = Object.assign(_IconDragArrow, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDragArrow.name, _IconDragArrow);
	},
});

export default IconDragArrow;
