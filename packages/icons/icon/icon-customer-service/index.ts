import _IconCustomerService from './icon-customer-service.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCustomerService = Object.assign(_IconCustomerService, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCustomerService.name, _IconCustomerService);
	},
});

export default IconCustomerService;
