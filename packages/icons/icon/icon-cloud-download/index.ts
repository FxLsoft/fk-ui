import _IconCloudDownload from './icon-cloud-download.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCloudDownload = Object.assign(_IconCloudDownload, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCloudDownload.name, _IconCloudDownload);
	},
});

export default IconCloudDownload;
