import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Tabs from './tabs';
import _TabPane from './tab-pane.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Tabs = Object.assign(_Tabs, {
	TabPane: _TabPane,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Tabs.name, _Tabs);
		app.component(componentPrefix + _TabPane.name, _TabPane);
	},
});

export type TabsInstance = InstanceType<typeof _Tabs>;
export type TabPaneInstance = InstanceType<typeof _TabPane>;

export { _TabPane as TabPane };

export default Tabs;
