import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _GridRow from './grid-row.vue';
import _GridCol from './grid-col.vue';
import _Grid from './grid.vue';
import _GridItem from './grid-item.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Grid = Object.assign(_Grid, {
	Row: _GridRow,
	Col: _GridCol,
	Item: _GridItem,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _GridRow.name, _GridRow);
		app.component(componentPrefix + _GridCol.name, _GridCol);
		app.component(componentPrefix + _Grid.name, _Grid);
		app.component(componentPrefix + _GridItem.name, _GridItem);
	},
});

export type GridRowInstance = InstanceType<typeof _GridRow>;
export type GridColInstance = InstanceType<typeof _GridCol>;
export type GridInstance = InstanceType<typeof _Grid>;
export type GridItemInstance = InstanceType<typeof _GridItem>;

export type { ResponsiveValue, RowProps, ColProps, GridProps, GridItemProps } from './interface';

export { _GridRow as Row, _GridCol as Col, _GridItem as GridItem };
export default Grid;
