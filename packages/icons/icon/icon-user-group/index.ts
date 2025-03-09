import _IconUserGroup from './icon-user-group.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconUserGroup = Object.assign(_IconUserGroup, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconUserGroup.name, _IconUserGroup);
	},
});

export default IconUserGroup;
