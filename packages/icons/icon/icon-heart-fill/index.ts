import _IconHeartFill from './icon-heart-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconHeartFill = Object.assign(_IconHeartFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconHeartFill.name, _IconHeartFill);
	},
});

export default IconHeartFill;
