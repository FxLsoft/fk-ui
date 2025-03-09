import _IconComputer from './icon-computer.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconComputer = Object.assign(_IconComputer, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconComputer.name, _IconComputer);
	},
});

export default IconComputer;
