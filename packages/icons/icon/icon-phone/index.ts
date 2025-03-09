import _IconPhone from './icon-phone.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconPhone = Object.assign(_IconPhone, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconPhone.name, _IconPhone);
	},
});

export default IconPhone;
