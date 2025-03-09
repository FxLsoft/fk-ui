import _IconSkipPreviousFill from './icon-skip-previous-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSkipPreviousFill = Object.assign(_IconSkipPreviousFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSkipPreviousFill.name, _IconSkipPreviousFill);
	},
});

export default IconSkipPreviousFill;
