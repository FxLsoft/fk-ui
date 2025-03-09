import _IconCaretUp from './icon-caret-up.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCaretUp = Object.assign(_IconCaretUp, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCaretUp.name, _IconCaretUp);
	},
});

export default IconCaretUp;
