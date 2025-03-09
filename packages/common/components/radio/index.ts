import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Radio from './radio';
import _RadioGroup from './radio-group';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Radio = Object.assign(_Radio, {
	Group: _RadioGroup,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Radio.name, _Radio);
		app.component(componentPrefix + _RadioGroup.name, _RadioGroup);
	},
});

export type RadioInstance = InstanceType<typeof _Radio>;
export type RadioGroupInstance = InstanceType<typeof _RadioGroup>;

export { _RadioGroup as RadioGroup };

export default Radio;
