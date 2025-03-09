import _IconUser from './icon-user.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconUser = Object.assign(_IconUser, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconUser.name, _IconUser);
	},
});

export default IconUser;
