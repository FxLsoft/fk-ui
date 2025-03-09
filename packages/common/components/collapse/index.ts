import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Collapse from './collapse.vue';
import _CollapseItem from './collapse-item';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Collapse = Object.assign(_Collapse, {
	Item: _CollapseItem,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Collapse.name, _Collapse);
		app.component(componentPrefix + _CollapseItem.name, _CollapseItem);
	},
});

export type CollapseInstance = InstanceType<typeof _Collapse>;
export type CollapseItemInstance = InstanceType<typeof _CollapseItem>;

export { _CollapseItem as CollapseItem };

export default Collapse;
