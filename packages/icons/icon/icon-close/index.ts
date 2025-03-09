import _IconClose from './icon-close.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconClose = Object.assign(_IconClose, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconClose.name, _IconClose);
	},
});

export default IconClose;
