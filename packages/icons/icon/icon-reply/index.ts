import _IconReply from './icon-reply.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconReply = Object.assign(_IconReply, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconReply.name, _IconReply);
	},
});

export default IconReply;
