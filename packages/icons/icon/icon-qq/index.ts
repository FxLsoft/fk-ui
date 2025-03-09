import _IconQq from './icon-qq.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconQq = Object.assign(_IconQq, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconQq.name, _IconQq);
	},
});

export default IconQq;
