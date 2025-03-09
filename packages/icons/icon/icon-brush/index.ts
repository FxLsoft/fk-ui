import _IconBrush from './icon-brush.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconBrush = Object.assign(_IconBrush, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconBrush.name, _IconBrush);
	},
});

export default IconBrush;
