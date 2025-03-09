import _IconLoop from './icon-loop.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLoop = Object.assign(_IconLoop, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLoop.name, _IconLoop);
	},
});

export default IconLoop;
