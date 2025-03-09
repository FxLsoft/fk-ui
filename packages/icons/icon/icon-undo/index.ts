import _IconUndo from './icon-undo.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconUndo = Object.assign(_IconUndo, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconUndo.name, _IconUndo);
	},
});

export default IconUndo;
