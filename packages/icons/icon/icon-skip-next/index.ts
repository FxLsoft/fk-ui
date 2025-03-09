import _IconSkipNext from './icon-skip-next.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSkipNext = Object.assign(_IconSkipNext, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSkipNext.name, _IconSkipNext);
	},
});

export default IconSkipNext;
