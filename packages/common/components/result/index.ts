import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Result from './result.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Result = Object.assign(_Result, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Result.name, _Result);
	},
});

export type ResultInstance = InstanceType<typeof _Result>;

export default Result;
