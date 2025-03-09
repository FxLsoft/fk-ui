import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Split from './split.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Split = Object.assign(_Split, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Split.name, _Split);
	},
});

export type SplitInstance = InstanceType<typeof _Split>;

export default Split;
