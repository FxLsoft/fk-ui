import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Tooltip from './tooltip.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Tooltip = Object.assign(_Tooltip, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Tooltip.name, _Tooltip);
	},
});

export type TooltipInstance = InstanceType<typeof _Tooltip>;
export type TooltipProps = Pick<TooltipInstance, '$props'>['$props'];

export default Tooltip;
