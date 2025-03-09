import _IconMinusCircleFill from './icon-minus-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconMinusCircleFill = Object.assign(_IconMinusCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconMinusCircleFill.name, _IconMinusCircleFill);
	},
});

export default IconMinusCircleFill;
