import _IconUpCircle from './icon-up-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconUpCircle = Object.assign(_IconUpCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconUpCircle.name, _IconUpCircle);
	},
});

export default IconUpCircle;
