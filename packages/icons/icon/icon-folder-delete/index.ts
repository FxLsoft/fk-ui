import _IconFolderDelete from './icon-folder-delete.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFolderDelete = Object.assign(_IconFolderDelete, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFolderDelete.name, _IconFolderDelete);
	},
});

export default IconFolderDelete;
