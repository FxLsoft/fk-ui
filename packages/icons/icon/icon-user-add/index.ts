import _IconUserAdd from './icon-user-add.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconUserAdd = Object.assign(_IconUserAdd, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconUserAdd.name, _IconUserAdd);
	},
});

export default IconUserAdd;
