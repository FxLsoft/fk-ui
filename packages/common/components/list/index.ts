import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _List from './list';
import _ListItem from './list-item';
import _ListItemMeta from './list-item-meta.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const List = Object.assign(_List, {
	Item: Object.assign(_ListItem, {
		Meta: _ListItemMeta,
	}),
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _List.name, _List);
		app.component(componentPrefix + _ListItem.name, _ListItem);
		app.component(componentPrefix + _ListItemMeta.name, _ListItemMeta);
	},
});

export type ListInstance = InstanceType<typeof _List>;
export type ListItemInstance = InstanceType<typeof _ListItem>;
export type ListItemMetaInstance = InstanceType<typeof _ListItemMeta>;

export { _ListItem as ListItem, _ListItemMeta as ListItemMeta };

export default List;
