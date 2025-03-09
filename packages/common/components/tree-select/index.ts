import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _TreeSelect from './tree-select.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const TreeSelect = Object.assign(_TreeSelect, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _TreeSelect.name, _TreeSelect);
	},
});

export type TreeSelectInstance = InstanceType<typeof _TreeSelect>;

export default TreeSelect;
