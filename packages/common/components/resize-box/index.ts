import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _ResizeBox from './resize-box.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const ResizeBox = Object.assign(_ResizeBox, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _ResizeBox.name, _ResizeBox);
	},
});

export type ResizeBoxInstance = InstanceType<typeof _ResizeBox>;

export default ResizeBox;
