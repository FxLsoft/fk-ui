import _IconPen from './icon-pen.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPen = Object.assign(_IconPen, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPen.name, _IconPen);
	},
});

export default IconPen;
