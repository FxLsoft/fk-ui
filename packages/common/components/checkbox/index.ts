import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Checkbox from './checkbox';
import _CheckboxGroup from './checkbox-group';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Checkbox = Object.assign(_Checkbox, {
	Group: _CheckboxGroup,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Checkbox.name, _Checkbox);
		app.component(componentPrefix + _CheckboxGroup.name, _CheckboxGroup);
	},
});

export type CheckboxInstance = InstanceType<typeof _Checkbox>;
export type CheckboxGroupInstance = InstanceType<typeof _CheckboxGroup>;
export type { CheckboxOption } from './interface';

export { _CheckboxGroup as CheckboxGroup };

export default Checkbox;
