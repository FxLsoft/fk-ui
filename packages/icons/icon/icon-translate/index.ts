import _IconTranslate from './icon-translate.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconTranslate = Object.assign(_IconTranslate, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconTranslate.name, _IconTranslate);
	},
});

export default IconTranslate;
