import _IconEdit from './icon-edit.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconEdit = Object.assign(_IconEdit, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconEdit.name, _IconEdit);
	},
});

export default IconEdit;
