import _IconFile from './icon-file.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFile = Object.assign(_IconFile, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFile.name, _IconFile);
	},
});

export default IconFile;
