import _IconGithub from './icon-github.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconGithub = Object.assign(_IconGithub, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconGithub.name, _IconGithub);
	},
});

export default IconGithub;
