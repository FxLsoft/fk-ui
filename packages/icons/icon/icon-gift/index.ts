import _IconGift from './icon-gift.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconGift = Object.assign(_IconGift, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconGift.name, _IconGift);
	},
});

export default IconGift;
