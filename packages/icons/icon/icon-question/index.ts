import _IconQuestion from './icon-question.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconQuestion = Object.assign(_IconQuestion, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconQuestion.name, _IconQuestion);
	},
});

export default IconQuestion;
