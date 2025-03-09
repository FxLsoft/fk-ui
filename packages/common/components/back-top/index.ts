import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _BackTop from './back-top.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const BackTop = Object.assign(_BackTop, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _BackTop.name, _BackTop);
	},
});

export type BackTopInstance = InstanceType<typeof _BackTop>;

export default BackTop;
