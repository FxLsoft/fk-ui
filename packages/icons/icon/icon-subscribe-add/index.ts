import _IconSubscribeAdd from './icon-subscribe-add.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconSubscribeAdd = Object.assign(_IconSubscribeAdd, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconSubscribeAdd.name, _IconSubscribeAdd);
	},
});

export default IconSubscribeAdd;
