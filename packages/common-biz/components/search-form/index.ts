import { getComponentPrefix } from '../../utils/constants';
import _SearchForm from './search-form';

import './style';
import type { App } from 'vue';

const SearchForm = Object.assign(_SearchForm, {
	install: (app: App, options) => {
		const componentPrefix = getComponentPrefix(options);
		app.component(componentPrefix + _SearchForm.name, _SearchForm);
	},
});

export default SearchForm;

export * from './interface';

export * from './api';
