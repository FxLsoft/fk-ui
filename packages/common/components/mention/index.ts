import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Mention from './mention';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Mention = Object.assign(_Mention, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Mention.name, _Mention);
	},
});

export type MentionInstance = InstanceType<typeof _Mention>;

export default Mention;
