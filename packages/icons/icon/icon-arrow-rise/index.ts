import _IconArrowRise from './icon-arrow-rise.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconArrowRise = Object.assign(_IconArrowRise, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconArrowRise.name, _IconArrowRise);
	},
});

export default IconArrowRise;
