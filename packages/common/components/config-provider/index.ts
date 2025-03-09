import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _ConfigProvider from './config-provider.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const ConfigProvider = Object.assign(_ConfigProvider, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _ConfigProvider.name, _ConfigProvider);
	},
});

export type ConfigProviderInstance = InstanceType<typeof _ConfigProvider>;

export default ConfigProvider;
