import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _InputTag from './input-tag';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const InputTag = Object.assign(_InputTag, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _InputTag.name, _InputTag);
	},
});

export type InputTagInstance = InstanceType<typeof _InputTag>;
export type { TagData, InputTagFieldNames } from './interface';

export default InputTag;
