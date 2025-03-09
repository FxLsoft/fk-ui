import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Breadcrumb from './breadcrumb';
import _BreadcrumbItem from './breadcrumb-item';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Breadcrumb = Object.assign(_Breadcrumb, {
	Item: _BreadcrumbItem,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Breadcrumb.name, _Breadcrumb);
		app.component(componentPrefix + _BreadcrumbItem.name, _BreadcrumbItem);
	},
});

export type BreadcrumbInstance = InstanceType<typeof _Breadcrumb>;
export type BreadcrumbItemInstance = InstanceType<typeof _BreadcrumbItem>;
export type { BreadcrumbRoute } from './interface';

export { _BreadcrumbItem as BreadcrumbItem };

export default Breadcrumb;
