import _IconWechat from './icon-wechat.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconWechat = Object.assign(_IconWechat, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconWechat.name, _IconWechat);
	},
});

export default IconWechat;
