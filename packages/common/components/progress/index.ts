import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Progress from './progress.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Progress = Object.assign(_Progress, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Progress.name, _Progress);
	},
});

export type ProgressInstance = InstanceType<typeof _Progress>;

export default Progress;
