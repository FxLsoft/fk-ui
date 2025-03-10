import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Card from './card';
import _CardMeta from './card-meta';
import _CardGrid from './card-grid.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Card = Object.assign(_Card, {
	Meta: _CardMeta,
	Grid: _CardGrid,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Card.name, _Card);
		app.component(componentPrefix + _CardMeta.name, _CardMeta);
		app.component(componentPrefix + _CardGrid.name, _CardGrid);
	},
});

export type CardInstance = InstanceType<typeof _Card>;
export type CardMetaInstance = InstanceType<typeof _CardMeta>;
export type CardGridInstance = InstanceType<typeof _CardGrid>;

export { _CardMeta as CardMeta, _CardGrid as CardGrid };

export default Card;
