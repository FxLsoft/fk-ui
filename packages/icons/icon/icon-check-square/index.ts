import _IconCheckSquare from './icon-check-square.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCheckSquare = Object.assign(_IconCheckSquare, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCheckSquare.name, _IconCheckSquare);
	},
});

export default IconCheckSquare;
