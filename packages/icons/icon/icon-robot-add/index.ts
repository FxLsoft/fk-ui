import _IconRobotAdd from './icon-robot-add.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconRobotAdd = Object.assign(_IconRobotAdd, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconRobotAdd.name, _IconRobotAdd);
	},
});

export default IconRobotAdd;
