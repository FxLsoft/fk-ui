import _IconThumbDownFill from './icon-thumb-down-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconThumbDownFill = Object.assign(_IconThumbDownFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconThumbDownFill.name, _IconThumbDownFill);
	},
});

export default IconThumbDownFill;
