import _IconEmpty from './icon-empty.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconEmpty = Object.assign(_IconEmpty, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconEmpty.name, _IconEmpty);
	},
});

export default IconEmpty;
