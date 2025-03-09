import _IconDice from './icon-dice.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconDice = Object.assign(_IconDice, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconDice.name, _IconDice);
	},
});

export default IconDice;
