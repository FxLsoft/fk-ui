import _IconUp from './icon-up.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconUp = Object.assign(_IconUp, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconUp.name, _IconUp);
	},
});

export default IconUp;
