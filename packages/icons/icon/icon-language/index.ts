import _IconLanguage from './icon-language.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconLanguage = Object.assign(_IconLanguage, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconLanguage.name, _IconLanguage);
	},
});

export default IconLanguage;
