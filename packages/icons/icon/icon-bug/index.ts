import _IconBug from './icon-bug.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconBug = Object.assign(_IconBug, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconBug.name, _IconBug);
	},
});

export default IconBug;
