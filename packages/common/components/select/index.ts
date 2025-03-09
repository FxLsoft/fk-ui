import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Select from './select';
import _Option from './option.vue';
import _Optgroup from './optgroup.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Select = Object.assign(_Select, {
	Option: _Option,
	OptGroup: _Optgroup,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Select.name, _Select);
		app.component(componentPrefix + _Option.name, _Option);
		app.component(componentPrefix + _Optgroup.name, _Optgroup);
	},
});

export type SelectInstance = InstanceType<typeof _Select>;
export type SelectOptionInstance = InstanceType<typeof _Option>;
export type SelectOptGroupInstance = InstanceType<typeof _Optgroup>;
export type { SelectProps, SelectOption, SelectOptionData, SelectOptionGroup, SelectFieldNames, FilterOption } from './interface';

export { _Option as Option, _Optgroup as Optgroup };

export default Select;
