import _IconArchive from './icon-archive.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconArchive = Object.assign(_IconArchive, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconArchive.name, _IconArchive);
	},
});

export default IconArchive;
