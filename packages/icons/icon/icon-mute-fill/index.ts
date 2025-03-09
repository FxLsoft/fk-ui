import _IconMuteFill from './icon-mute-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMuteFill = Object.assign(_IconMuteFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMuteFill.name, _IconMuteFill);
	},
});

export default IconMuteFill;
