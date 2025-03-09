import _IconImageClose from './icon-image-close.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconImageClose = Object.assign(_IconImageClose, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconImageClose.name, _IconImageClose);
	},
});

export default IconImageClose;
