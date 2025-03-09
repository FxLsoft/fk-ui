import { getComponentPrefix } from '../../utils/constants';
import _Comp from './RangeNumberInput.vue';
import './style';
import type { App } from 'vue';

const Comp = Object.assign(_Comp, {
	install: (app: App, options) => {
		const componentPrefix = getComponentPrefix(options);
		app.component(componentPrefix + _Comp.name, _Comp);
	},
});

export default Comp;

export const RangeNumberInput = _Comp;
