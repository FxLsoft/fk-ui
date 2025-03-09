import _IconFormula from './icon-formula.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFormula = Object.assign(_IconFormula, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFormula.name, _IconFormula);
	},
});

export default IconFormula;
