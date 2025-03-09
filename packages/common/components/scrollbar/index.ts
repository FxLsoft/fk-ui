import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Scrollbar from './scrollbar.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Scrollbar = Object.assign(_Scrollbar, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Scrollbar.name, _Scrollbar);
	},
});

export type ScrollbarInstance = InstanceType<typeof _Scrollbar>;
export type { ScrollbarProps } from './interface';

export default Scrollbar;
