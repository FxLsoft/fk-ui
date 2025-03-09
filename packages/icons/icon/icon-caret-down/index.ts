import _IconCaretDown from './icon-caret-down.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCaretDown = Object.assign(_IconCaretDown, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCaretDown.name, _IconCaretDown);
	},
});

export default IconCaretDown;
