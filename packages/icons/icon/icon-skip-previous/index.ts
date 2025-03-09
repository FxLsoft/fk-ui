import _IconSkipPrevious from './icon-skip-previous.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSkipPrevious = Object.assign(_IconSkipPrevious, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSkipPrevious.name, _IconSkipPrevious);
	},
});

export default IconSkipPrevious;
