import _IconThumbUpFill from './icon-thumb-up-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconThumbUpFill = Object.assign(_IconThumbUpFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconThumbUpFill.name, _IconThumbUpFill);
	},
});

export default IconThumbUpFill;
