import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Empty from './empty';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Empty = Object.assign(_Empty, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Empty.name, _Empty);
	},
});

export type EmptyInstance = InstanceType<typeof _Empty>;

export default Empty;
