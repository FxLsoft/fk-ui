import _IconBranch from './icon-branch.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconBranch = Object.assign(_IconBranch, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconBranch.name, _IconBranch);
	},
});

export default IconBranch;
