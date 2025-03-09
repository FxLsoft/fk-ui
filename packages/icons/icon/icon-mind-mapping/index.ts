import _IconMindMapping from './icon-mind-mapping.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMindMapping = Object.assign(_IconMindMapping, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMindMapping.name, _IconMindMapping);
	},
});

export default IconMindMapping;
