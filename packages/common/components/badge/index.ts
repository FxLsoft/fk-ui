import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Badge from './badge';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Badge = Object.assign(_Badge, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Badge.name, _Badge);
	},
});

export type BadgeInstance = InstanceType<typeof _Badge>;

export default Badge;
