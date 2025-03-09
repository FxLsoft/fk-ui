import _IconBackward from './icon-backward.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconBackward = Object.assign(_IconBackward, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconBackward.name, _IconBackward);
	},
});

export default IconBackward;
