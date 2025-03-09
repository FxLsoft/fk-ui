import { VxeUI } from '../ui';
import VxeTableComponent from './src/table';
import { useCellView } from './src/use';
import type { App } from 'vue';
import './module/filter/hook';
import './module/menu/hook';
import './module/edit/hook';
import './module/export/hook';
import './module/keyboard/hook';
import './module/validator/hook';
import './module/custom/hook';
import './render';

import type { TableHandleExport } from '../types';

export const VxeTable = Object.assign({}, VxeTableComponent, {
	install(app: App) {
		app.component(VxeTableComponent.name as string, VxeTableComponent);
	},
});

const tableHandle: TableHandleExport = {
	useCellView,
};

VxeUI.component(VxeTableComponent);
VxeUI.tableHandle = tableHandle;

export const Table = VxeTable;
export default VxeTable;
