import _IconInfo from './icon-info.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconInfo = Object.assign(_IconInfo, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconInfo.name, _IconInfo);
	},
});

export default IconInfo;
