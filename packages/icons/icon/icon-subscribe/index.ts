import _IconSubscribe from './icon-subscribe.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSubscribe = Object.assign(_IconSubscribe, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSubscribe.name, _IconSubscribe);
	},
});

export default IconSubscribe;
