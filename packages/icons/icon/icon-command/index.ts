import _IconCommand from './icon-command.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCommand = Object.assign(_IconCommand, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCommand.name, _IconCommand);
	},
});

export default IconCommand;
