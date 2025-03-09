import _IconSwap from './icon-swap.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSwap = Object.assign(_IconSwap, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSwap.name, _IconSwap);
	},
});

export default IconSwap;
