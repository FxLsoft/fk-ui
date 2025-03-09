import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Space from './space';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Space = Object.assign(_Space, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Space.name, _Space);
	},
});

export type SpaceInstance = InstanceType<typeof _Space>;

export default Space;
