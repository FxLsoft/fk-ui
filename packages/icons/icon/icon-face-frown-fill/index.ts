import _IconFaceFrownFill from './icon-face-frown-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFaceFrownFill = Object.assign(_IconFaceFrownFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFaceFrownFill.name, _IconFaceFrownFill);
	},
});

export default IconFaceFrownFill;
