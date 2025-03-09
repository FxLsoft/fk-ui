import _IconArrowFall from './icon-arrow-fall.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconArrowFall = Object.assign(_IconArrowFall, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconArrowFall.name, _IconArrowFall);
	},
});

export default IconArrowFall;
