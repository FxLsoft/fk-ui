import _IconSettings from './icon-settings.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSettings = Object.assign(_IconSettings, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSettings.name, _IconSettings);
	},
});

export default IconSettings;
