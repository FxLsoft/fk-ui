import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Popover from './popover.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Popover = Object.assign(_Popover, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Popover.name, _Popover);
	},
});

export type PopoverInstance = InstanceType<typeof _Popover>;

export default Popover;
