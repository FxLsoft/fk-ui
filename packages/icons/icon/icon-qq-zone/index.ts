import _IconQqZone from './icon-qq-zone.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconQqZone = Object.assign(_IconQqZone, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconQqZone.name, _IconQqZone);
	},
});

export default IconQqZone;
