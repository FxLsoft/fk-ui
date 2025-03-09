import _IconStrikethrough from './icon-strikethrough.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconStrikethrough = Object.assign(_IconStrikethrough, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconStrikethrough.name, _IconStrikethrough);
	},
});

export default IconStrikethrough;
