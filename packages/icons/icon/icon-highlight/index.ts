import _IconHighlight from './icon-highlight.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconHighlight = Object.assign(_IconHighlight, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconHighlight.name, _IconHighlight);
	},
});

export default IconHighlight;
