import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _PageHeader from './page-header.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const PageHeader = Object.assign(_PageHeader, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _PageHeader.name, _PageHeader);
	},
});

export type PageHeaderInstance = InstanceType<typeof _PageHeader>;

export default PageHeader;
