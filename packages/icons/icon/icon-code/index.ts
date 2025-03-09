import _IconCode from './icon-code.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCode = Object.assign(_IconCode, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCode.name, _IconCode);
	},
});

export default IconCode;
