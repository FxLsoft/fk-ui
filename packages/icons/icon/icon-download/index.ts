import _IconDownload from './icon-download.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDownload = Object.assign(_IconDownload, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDownload.name, _IconDownload);
	},
});

export default IconDownload;
