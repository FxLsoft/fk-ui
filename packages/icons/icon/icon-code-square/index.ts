import _IconCodeSquare from './icon-code-square.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCodeSquare = Object.assign(_IconCodeSquare, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCodeSquare.name, _IconCodeSquare);
	},
});

export default IconCodeSquare;
