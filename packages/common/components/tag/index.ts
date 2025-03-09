import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Tag from './tag.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Tag = Object.assign(_Tag, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Tag.name, _Tag);
	},
});

export type TagInstance = InstanceType<typeof _Tag>;
export type { TagProps, TagColor } from './interface';

export default Tag;
