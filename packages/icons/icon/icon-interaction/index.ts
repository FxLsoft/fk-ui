import _IconInteraction from './icon-interaction.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconInteraction = Object.assign(_IconInteraction, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconInteraction.name, _IconInteraction);
	},
});

export default IconInteraction;
