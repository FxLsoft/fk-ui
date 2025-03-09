import _IconPrinter from './icon-printer.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPrinter = Object.assign(_IconPrinter, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPrinter.name, _IconPrinter);
	},
});

export default IconPrinter;
