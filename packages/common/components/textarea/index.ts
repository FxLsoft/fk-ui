import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Textarea from './textarea.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Textarea = Object.assign(_Textarea, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Textarea.name, _Textarea);
	},
});

export type TextareaInstance = InstanceType<typeof _Textarea>;

export default Textarea;
