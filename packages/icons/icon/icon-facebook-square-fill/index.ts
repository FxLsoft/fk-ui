import _IconFacebookSquareFill from './icon-facebook-square-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFacebookSquareFill = Object.assign(_IconFacebookSquareFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFacebookSquareFill.name, _IconFacebookSquareFill);
	},
});

export default IconFacebookSquareFill;
