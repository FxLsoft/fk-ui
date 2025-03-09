import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _InputNumber from './input-number';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const InputNumber = Object.assign(_InputNumber, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _InputNumber.name, _InputNumber);
	},
});

export type InputNumberInstance = InstanceType<typeof _InputNumber>;

export default InputNumber;
