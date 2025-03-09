import { VxeUI } from '../ui';
import VxeGridComponent from './src/grid';
import type { App } from 'vue';

export const VxeGrid = Object.assign(VxeGridComponent, {
	install(app: App) {
		app.component(VxeGridComponent.name as string, VxeGridComponent);
	},
});

VxeUI.component(VxeGridComponent);

export const Grid = VxeGrid;
export default VxeGrid;
