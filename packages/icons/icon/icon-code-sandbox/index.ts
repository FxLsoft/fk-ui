import _IconCodeSandbox from './icon-code-sandbox.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCodeSandbox = Object.assign(_IconCodeSandbox, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCodeSandbox.name, _IconCodeSandbox);
	},
});

export default IconCodeSandbox;
