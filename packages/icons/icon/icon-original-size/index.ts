import _IconOriginalSize from './icon-original-size.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconOriginalSize = Object.assign(_IconOriginalSize, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconOriginalSize.name, _IconOriginalSize);
	},
});

export default IconOriginalSize;
