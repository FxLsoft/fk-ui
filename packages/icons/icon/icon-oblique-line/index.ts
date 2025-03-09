import _IconObliqueLine from './icon-oblique-line.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconObliqueLine = Object.assign(_IconObliqueLine, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconObliqueLine.name, _IconObliqueLine);
	},
});

export default IconObliqueLine;
