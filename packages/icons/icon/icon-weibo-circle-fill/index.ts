import _IconWeiboCircleFill from './icon-weibo-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconWeiboCircleFill = Object.assign(_IconWeiboCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconWeiboCircleFill.name, _IconWeiboCircleFill);
	},
});

export default IconWeiboCircleFill;
