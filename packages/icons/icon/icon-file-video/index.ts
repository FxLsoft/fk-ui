import _IconFileVideo from './icon-file-video.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconFileVideo = Object.assign(_IconFileVideo, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconFileVideo.name, _IconFileVideo);
	},
});

export default IconFileVideo;
