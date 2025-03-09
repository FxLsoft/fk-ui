import _IconGitlab from './icon-gitlab.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconGitlab = Object.assign(_IconGitlab, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconGitlab.name, _IconGitlab);
	},
});

export default IconGitlab;
