import _IconFolderAdd from './icon-folder-add.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFolderAdd = Object.assign(_IconFolderAdd, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFolderAdd.name, _IconFolderAdd);
	},
});

export default IconFolderAdd;
