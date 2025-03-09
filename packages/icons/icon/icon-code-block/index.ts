import _IconCodeBlock from './icon-code-block.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconCodeBlock = Object.assign(_IconCodeBlock, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconCodeBlock.name, _IconCodeBlock);
	},
});

export default IconCodeBlock;
