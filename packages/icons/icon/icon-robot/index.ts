import _IconRobot from './icon-robot.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconRobot = Object.assign(_IconRobot, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconRobot.name, _IconRobot);
	},
});

export default IconRobot;
