import _IconTags from './icon-tags.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconTags = Object.assign(_IconTags, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconTags.name, _IconTags);
	},
});

export default IconTags;
