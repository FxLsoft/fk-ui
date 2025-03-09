import _IconPlusCircle from './icon-plus-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPlusCircle = Object.assign(_IconPlusCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPlusCircle.name, _IconPlusCircle);
	},
});

export default IconPlusCircle;
