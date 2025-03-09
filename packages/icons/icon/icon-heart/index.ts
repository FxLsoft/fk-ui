import _IconHeart from './icon-heart.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconHeart = Object.assign(_IconHeart, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconHeart.name, _IconHeart);
	},
});

export default IconHeart;
