import _IconExperiment from './icon-experiment.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconExperiment = Object.assign(_IconExperiment, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconExperiment.name, _IconExperiment);
	},
});

export default IconExperiment;
