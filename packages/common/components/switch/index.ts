import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Switch from './switch.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Switch = Object.assign(_Switch, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Switch.name, _Switch);
	},
});

export type SwitchInstance = InstanceType<typeof _Switch>;

export default Switch;
