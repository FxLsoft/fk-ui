import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Link from './link.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Link = Object.assign(_Link, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Link.name, _Link);
	},
});

export type LinkInstance = InstanceType<typeof _Link>;

export default Link;
