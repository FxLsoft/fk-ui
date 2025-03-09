import _IconLink from './icon-link.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLink = Object.assign(_IconLink, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLink.name, _IconLink);
	},
});

export default IconLink;
