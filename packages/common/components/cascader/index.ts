import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Cascader from './cascader.vue';
import _CascaderPanel from './cascader-panel.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Cascader = Object.assign(_Cascader, {
	CascaderPanel: _CascaderPanel,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Cascader.name, _Cascader);
		app.component(componentPrefix + _CascaderPanel.name, _CascaderPanel);
	},
});

export type CascaderInstance = InstanceType<typeof _Cascader>;
export type CascaderPanelInstance = InstanceType<typeof _CascaderPanel>;
export type { CascaderOption, CascaderFieldNames } from './interface';

export { _CascaderPanel as CascaderPanel };
export default Cascader;
