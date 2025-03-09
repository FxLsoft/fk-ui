import _IconScissor from './icon-scissor.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconScissor = Object.assign(_IconScissor, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconScissor.name, _IconScissor);
	},
});

export default IconScissor;
