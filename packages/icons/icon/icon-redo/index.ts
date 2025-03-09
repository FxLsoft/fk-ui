import _IconRedo from './icon-redo.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconRedo = Object.assign(_IconRedo, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconRedo.name, _IconRedo);
	},
});

export default IconRedo;
