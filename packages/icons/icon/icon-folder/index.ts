import _IconFolder from './icon-folder.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFolder = Object.assign(_IconFolder, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFolder.name, _IconFolder);
	},
});

export default IconFolder;
