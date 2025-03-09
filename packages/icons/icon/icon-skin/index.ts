import _IconSkin from './icon-skin.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSkin = Object.assign(_IconSkin, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSkin.name, _IconSkin);
	},
});

export default IconSkin;
