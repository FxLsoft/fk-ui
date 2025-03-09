import _IconQuote from './icon-quote.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconQuote = Object.assign(_IconQuote, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconQuote.name, _IconQuote);
	},
});

export default IconQuote;
