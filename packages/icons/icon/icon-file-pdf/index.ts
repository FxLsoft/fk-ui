import _IconFilePdf from './icon-file-pdf.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFilePdf = Object.assign(_IconFilePdf, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFilePdf.name, _IconFilePdf);
	},
});

export default IconFilePdf;
