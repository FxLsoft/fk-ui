import _IconSave from './icon-save.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSave = Object.assign(_IconSave, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSave.name, _IconSave);
	},
});

export default IconSave;
