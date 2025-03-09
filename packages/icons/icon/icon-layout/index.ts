import _IconLayout from './icon-layout.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLayout = Object.assign(_IconLayout, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLayout.name, _IconLayout);
	},
});

export default IconLayout;
