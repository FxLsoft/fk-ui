import { VxeUI } from '../ui';
import VxeColumnComponent from '../table/src/column';
import type { App } from 'vue';

export const VxeColumn = Object.assign({}, VxeColumnComponent, {
	install(app: App) {
		app.component(VxeColumnComponent.name as string, VxeColumnComponent);
	},
});

VxeUI.component(VxeColumnComponent);

export const Column = VxeColumn;
export default VxeColumn;
