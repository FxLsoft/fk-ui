import _IconDashboard from './icon-dashboard.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDashboard = Object.assign(_IconDashboard, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDashboard.name, _IconDashboard);
	},
});

export default IconDashboard;
