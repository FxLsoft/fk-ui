import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Rate from './rate';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Rate = Object.assign(_Rate, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Rate.name, _Rate);
	},
});

export type RateInstance = InstanceType<typeof _Rate>;

export default Rate;
