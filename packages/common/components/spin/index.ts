import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Spin from './spin';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Spin = Object.assign(_Spin, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Spin.name, _Spin);
	},
});

export type SpinInstance = InstanceType<typeof _Spin>;

export default Spin;
