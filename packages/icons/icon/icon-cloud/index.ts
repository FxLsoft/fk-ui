import _IconCloud from './icon-cloud.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCloud = Object.assign(_IconCloud, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCloud.name, _IconCloud);
	},
});

export default IconCloud;
