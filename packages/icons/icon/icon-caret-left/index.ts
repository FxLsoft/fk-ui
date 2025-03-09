import _IconCaretLeft from './icon-caret-left.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCaretLeft = Object.assign(_IconCaretLeft, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCaretLeft.name, _IconCaretLeft);
	},
});

export default IconCaretLeft;
