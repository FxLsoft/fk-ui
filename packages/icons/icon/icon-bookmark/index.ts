import _IconBookmark from './icon-bookmark.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconBookmark = Object.assign(_IconBookmark, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconBookmark.name, _IconBookmark);
	},
});

export default IconBookmark;
