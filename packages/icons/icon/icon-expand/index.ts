import _IconExpand from './icon-expand.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconExpand = Object.assign(_IconExpand, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconExpand.name, _IconExpand);
	},
});

export default IconExpand;
