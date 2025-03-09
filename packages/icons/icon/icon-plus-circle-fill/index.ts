import _IconPlusCircleFill from './icon-plus-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPlusCircleFill = Object.assign(_IconPlusCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPlusCircleFill.name, _IconPlusCircleFill);
	},
});

export default IconPlusCircleFill;
