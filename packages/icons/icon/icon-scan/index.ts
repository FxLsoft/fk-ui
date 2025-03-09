import _IconScan from './icon-scan.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconScan = Object.assign(_IconScan, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconScan.name, _IconScan);
	},
});

export default IconScan;
