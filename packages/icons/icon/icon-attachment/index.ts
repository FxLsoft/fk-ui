import _IconAttachment from './icon-attachment.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconAttachment = Object.assign(_IconAttachment, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconAttachment.name, _IconAttachment);
	},
});

export default IconAttachment;
