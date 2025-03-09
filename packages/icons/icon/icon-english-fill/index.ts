import _IconEnglishFill from './icon-english-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconEnglishFill = Object.assign(_IconEnglishFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconEnglishFill.name, _IconEnglishFill);
	},
});

export default IconEnglishFill;
