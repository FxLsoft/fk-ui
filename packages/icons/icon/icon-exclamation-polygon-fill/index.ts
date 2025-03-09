import _IconExclamationPolygonFill from './icon-exclamation-polygon-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconExclamationPolygonFill = Object.assign(_IconExclamationPolygonFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconExclamationPolygonFill.name, _IconExclamationPolygonFill);
	},
});

export default IconExclamationPolygonFill;
