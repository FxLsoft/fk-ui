import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Icon from './icon.vue';
import { addFromIconFontCn } from './add-from-icon-font-cn';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Icon = Object.assign(_Icon, {
	addFromIconFontCn,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Icon.name, _Icon);
	},
});

export type IconInstance = InstanceType<typeof _Icon>;
export type IconProps = IconInstance['$props'];

export default Icon;
