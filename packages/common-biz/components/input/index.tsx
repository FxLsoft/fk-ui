import { getComponentPrefix } from '../../utils/constants';
import _Input from './input';
import './style';
import type { App } from 'vue';

const Input = Object.assign(_Input, {
	install: (app: App, options) => {
		const componentPrefix = getComponentPrefix(options);
		app.component(componentPrefix + _Input.name, _Input);
	},
});

export type InputInstance = InstanceType<typeof _Input>;

export default Input;

export * from './interface';
