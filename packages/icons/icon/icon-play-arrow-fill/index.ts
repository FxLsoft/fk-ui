import _IconPlayArrowFill from './icon-play-arrow-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPlayArrowFill = Object.assign(_IconPlayArrowFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPlayArrowFill.name, _IconPlayArrowFill);
	},
});

export default IconPlayArrowFill;
