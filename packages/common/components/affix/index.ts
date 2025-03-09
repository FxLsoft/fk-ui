import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Affix from './affix.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Affix = Object.assign(_Affix, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Affix.name, _Affix);
	},
});

export type AffixInstance = InstanceType<typeof _Affix>;

export default Affix;
