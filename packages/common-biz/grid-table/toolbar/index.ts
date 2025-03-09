import { VxeUI } from '../ui';
import VxeToolbarComponent from './src/toolbar';
import type { App } from 'vue';

export const VxeToolbar = Object.assign({}, VxeToolbarComponent, {
	install(app: App) {
		app.component(VxeToolbarComponent.name as string, VxeToolbarComponent);
	},
});

VxeUI.component(VxeToolbarComponent);

export const Toolbar = VxeToolbar;
export default VxeToolbar;
