import _IconMinusCircle from './icon-minus-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMinusCircle = Object.assign(_IconMinusCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMinusCircle.name, _IconMinusCircle);
	},
});

export default IconMinusCircle;
