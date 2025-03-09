import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Popconfirm from './popconfirm.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Popconfirm = Object.assign(_Popconfirm, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Popconfirm.name, _Popconfirm);
	},
});

export type PopconfirmInstance = InstanceType<typeof _Popconfirm>;

export default Popconfirm;
