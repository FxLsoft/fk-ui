import _IconAt from './icon-at.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconAt = Object.assign(_IconAt, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconAt.name, _IconAt);
	},
});

export default IconAt;
