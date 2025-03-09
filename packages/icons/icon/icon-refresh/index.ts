import _IconRefresh from './icon-refresh.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconRefresh = Object.assign(_IconRefresh, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconRefresh.name, _IconRefresh);
	},
});

export default IconRefresh;
