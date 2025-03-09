import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _AutoComplete from './auto-complete';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const AutoComplete = Object.assign(_AutoComplete, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _AutoComplete.name, _AutoComplete);
	},
});

export type AutoCompleteInstance = InstanceType<typeof _AutoComplete>;

export default AutoComplete;
