import _IconPlayArrow from './icon-play-arrow.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPlayArrow = Object.assign(_IconPlayArrow, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPlayArrow.name, _IconPlayArrow);
	},
});

export default IconPlayArrow;
