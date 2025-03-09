import _IconArrowUp from './icon-arrow-up.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconArrowUp = Object.assign(_IconArrowUp, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconArrowUp.name, _IconArrowUp);
	},
});

export default IconArrowUp;
