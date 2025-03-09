import _IconTool from './icon-tool.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconTool = Object.assign(_IconTool, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconTool.name, _IconTool);
	},
});

export default IconTool;
