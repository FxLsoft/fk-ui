import { getComponentPrefix } from '../../utils/constants';
import _DynamicForm from './dynamic-form';
import './style';
import type { DynamicFormI } from './interface';
import type { App } from 'vue';

const DynamicForm = Object.assign(_DynamicForm, {
	install: (app: App, options) => {
		const componentPrefix = getComponentPrefix(options);
		app.component(componentPrefix + _DynamicForm.name, _DynamicForm);
	},
});

export default DynamicForm;

export type DynamicFormInstance = InstanceType<typeof DynamicForm>;

export * from './interface';

export interface DynamicFormConfig extends DynamicFormI {}
