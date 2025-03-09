import _IconThunderbolt from './icon-thunderbolt.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconThunderbolt = Object.assign(_IconThunderbolt, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconThunderbolt.name, _IconThunderbolt);
	},
});

export default IconThunderbolt;
