import _IconQuestionCircle from './icon-question-circle.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconQuestionCircle = Object.assign(_IconQuestionCircle, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconQuestionCircle.name, _IconQuestionCircle);
	},
});

export default IconQuestionCircle;
