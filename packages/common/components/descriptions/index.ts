import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Descriptions from './descriptions';
import _DescriptionsItem from './descriptions-item.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Descriptions = Object.assign(_Descriptions, {
	DescriptionsItem: _DescriptionsItem,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Descriptions.name, _Descriptions);
		app.component(componentPrefix + _DescriptionsItem.name, _DescriptionsItem);
	},
});

export type DescriptionsInstance = InstanceType<typeof _Descriptions>;
export type DescriptionsItemInstance = InstanceType<typeof _DescriptionsItem>;

export type { DescData } from './interface';

export { _DescriptionsItem as DescriptionsItem };

export default Descriptions;
