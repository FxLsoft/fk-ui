import _IconMinus from './icon-minus.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMinus = Object.assign(_IconMinus, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMinus.name, _IconMinus);
	},
});

export default IconMinus;
