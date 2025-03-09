import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Steps from './steps.vue';
import _StepsStep from './step.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Steps = Object.assign(_Steps, {
	Step: _StepsStep,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Steps.name, _Steps);
		app.component(componentPrefix + _StepsStep.name, _StepsStep);
	},
});

export type StepsInstance = InstanceType<typeof _Steps>;
export type StepsStepInstance = InstanceType<typeof _StepsStep>;

export { _StepsStep as Step };

export default Steps;
