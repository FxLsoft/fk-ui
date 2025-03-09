import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Transfer from './transfer.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Transfer = Object.assign(_Transfer, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Transfer.name, _Transfer);
	},
});

export type TransferInstance = InstanceType<typeof _Transfer>;

export default Transfer;

export * from './interface';
