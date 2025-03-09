import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _OverflowList from './overflow-list';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const OverflowList = Object.assign(_OverflowList, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _OverflowList.name, _OverflowList);
	},
});

export type OverflowListInstance = InstanceType<typeof _OverflowList>;

export default OverflowList;
