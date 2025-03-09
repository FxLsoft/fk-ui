import _IconMoreVertical from './icon-more-vertical.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMoreVertical = Object.assign(_IconMoreVertical, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMoreVertical.name, _IconMoreVertical);
	},
});

export default IconMoreVertical;
