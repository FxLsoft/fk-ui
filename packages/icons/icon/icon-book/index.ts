import _IconBook from './icon-book.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconBook = Object.assign(_IconBook, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconBook.name, _IconBook);
	},
});

export default IconBook;
