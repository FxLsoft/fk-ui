import _IconDelete from './icon-delete.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDelete = Object.assign(_IconDelete, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDelete.name, _IconDelete);
	},
});

export default IconDelete;
