import { VxeUI } from '../ui';
import VxeColgroupComponent from '../table/src/group';
import type { App } from 'vue';

export const VxeColgroup = Object.assign({}, VxeColgroupComponent, {
	install(app: App) {
		app.component(VxeColgroupComponent.name as string, VxeColgroupComponent);
		// 兼容旧用法
		app.component('VxeTableColgroup', VxeColgroupComponent);
	},
});

VxeUI.component(VxeColgroupComponent);

export const Colgroup = VxeColgroup;
export default VxeColgroup;
