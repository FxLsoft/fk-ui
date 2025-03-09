import _IconIdcard from './icon-idcard.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconIdcard = Object.assign(_IconIdcard, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconIdcard.name, _IconIdcard);
	},
});

export default IconIdcard;
