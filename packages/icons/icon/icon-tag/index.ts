import _IconTag from './icon-tag.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconTag = Object.assign(_IconTag, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconTag.name, _IconTag);
	},
});

export default IconTag;
