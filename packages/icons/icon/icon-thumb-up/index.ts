import _IconThumbUp from './icon-thumb-up.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconThumbUp = Object.assign(_IconThumbUp, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconThumbUp.name, _IconThumbUp);
	},
});

export default IconThumbUp;
