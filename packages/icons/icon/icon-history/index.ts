import _IconHistory from './icon-history.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconHistory = Object.assign(_IconHistory, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconHistory.name, _IconHistory);
	},
});

export default IconHistory;
