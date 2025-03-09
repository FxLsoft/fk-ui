import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Alert from './alert.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Alert = Object.assign(_Alert, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Alert.name, _Alert);
	},
});

export type AlertInstance = InstanceType<typeof _Alert>;

export default Alert;
