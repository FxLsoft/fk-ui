import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Slider from './slider.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Slider = Object.assign(_Slider, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Slider.name, _Slider);
	},
});

export type SliderInstance = InstanceType<typeof _Slider>;

export default Slider;
