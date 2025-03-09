import _IconThumbDown from './icon-thumb-down.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconThumbDown = Object.assign(_IconThumbDown, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconThumbDown.name, _IconThumbDown);
	},
});

export default IconThumbDown;
