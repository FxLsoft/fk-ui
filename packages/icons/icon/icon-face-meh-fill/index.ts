import _IconFaceMehFill from './icon-face-meh-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFaceMehFill = Object.assign(_IconFaceMehFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFaceMehFill.name, _IconFaceMehFill);
	},
});

export default IconFaceMehFill;
