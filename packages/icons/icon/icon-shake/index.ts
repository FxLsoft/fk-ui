import _IconShake from './icon-shake.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconShake = Object.assign(_IconShake, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconShake.name, _IconShake);
	},
});

export default IconShake;
