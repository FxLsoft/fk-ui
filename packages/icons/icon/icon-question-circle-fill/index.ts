import _IconQuestionCircleFill from './icon-question-circle-fill.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconQuestionCircleFill = Object.assign(_IconQuestionCircleFill, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconQuestionCircleFill.name, _IconQuestionCircleFill);
	},
});

export default IconQuestionCircleFill;
