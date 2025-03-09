import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Comment from './comment.vue';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Comment = Object.assign(_Comment, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Comment.name, _Comment);
	},
});

export type CommentInstance = InstanceType<typeof _Comment>;

export default Comment;
