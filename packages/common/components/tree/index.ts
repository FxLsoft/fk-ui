import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Tree from './tree.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

export type { TreeNodeData, TreeFieldNames } from './interface';

const Tree = Object.assign(_Tree, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Tree.name, _Tree);
	},
});

export type TreeInstance = InstanceType<typeof _Tree>;

export default Tree;
