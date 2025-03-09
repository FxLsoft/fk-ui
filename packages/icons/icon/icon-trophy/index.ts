import _IconTrophy from './icon-trophy.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconTrophy = Object.assign(_IconTrophy, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconTrophy.name, _IconTrophy);
	},
});

export default IconTrophy;
