import _IconUpload from './icon-upload.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconUpload = Object.assign(_IconUpload, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconUpload.name, _IconUpload);
	},
});

export default IconUpload;
