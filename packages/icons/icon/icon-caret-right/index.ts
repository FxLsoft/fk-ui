import _IconCaretRight from './icon-caret-right.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCaretRight = Object.assign(_IconCaretRight, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCaretRight.name, _IconCaretRight);
	},
});

export default IconCaretRight;
