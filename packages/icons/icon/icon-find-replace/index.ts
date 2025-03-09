import _IconFindReplace from './icon-find-replace.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFindReplace = Object.assign(_IconFindReplace, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFindReplace.name, _IconFindReplace);
	},
});

export default IconFindReplace;
