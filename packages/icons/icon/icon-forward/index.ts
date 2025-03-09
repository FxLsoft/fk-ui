import _IconForward from './icon-forward.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconForward = Object.assign(_IconForward, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconForward.name, _IconForward);
	},
});

export default IconForward;
