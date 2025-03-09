import './env';
import './shims-vue';
import './svg';
import 'unplugin-vue-define-options';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {}
}

declare global {}

interface Window {
	MuiPlayer?: any;
}
