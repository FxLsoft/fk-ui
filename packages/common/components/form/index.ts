import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Form from './form.vue';
import _FormItem from './form-item.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Form = Object.assign(_Form, {
	Item: _FormItem,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Form.name, _Form);
		app.component(componentPrefix + _FormItem.name, _FormItem);
	},
});

export type FormInstance = InstanceType<typeof _Form>;
export type FormItemInstance = InstanceType<typeof _FormItem>;
export type { ValidateStatus, ValidateTrigger, ValidatedError, FieldRule, FormItemEventHandler } from './interface';

export { _FormItem as FormItem };

export default Form;
