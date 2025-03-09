import _IconQrcode from './icon-qrcode.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconQrcode = Object.assign(_IconQrcode, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconQrcode.name, _IconQrcode);
	},
});

export default IconQrcode;
