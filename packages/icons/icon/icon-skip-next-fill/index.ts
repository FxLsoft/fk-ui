import _IconSkipNextFill from './icon-skip-next-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSkipNextFill = Object.assign(_IconSkipNextFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSkipNextFill.name, _IconSkipNextFill);
	},
});

export default IconSkipNextFill;
