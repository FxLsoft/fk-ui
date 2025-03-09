import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Divider from './divider';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Divider = Object.assign(_Divider, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Divider.name, _Divider);
	},
});

export type DividerInstance = InstanceType<typeof _Divider>;

export default Divider;
