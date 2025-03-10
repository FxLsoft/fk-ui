import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Pagination from './pagination';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Pagination = Object.assign(_Pagination, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Pagination.name, _Pagination);
	},
});

export type PaginationInstance = InstanceType<typeof _Pagination>;
export type { PaginationProps } from './interface';

export default Pagination;
