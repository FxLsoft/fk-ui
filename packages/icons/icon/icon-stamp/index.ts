import _IconStamp from './icon-stamp.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconStamp = Object.assign(_IconStamp, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconStamp.name, _IconStamp);
	},
});

export default IconStamp;
