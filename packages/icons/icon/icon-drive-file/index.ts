import _IconDriveFile from './icon-drive-file.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDriveFile = Object.assign(_IconDriveFile, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDriveFile.name, _IconDriveFile);
	},
});

export default IconDriveFile;
