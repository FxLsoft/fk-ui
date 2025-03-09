import _IconMan from './icon-man.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMan = Object.assign(_IconMan, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMan.name, _IconMan);
	},
});

export default IconMan;
