import './index.less';

import { defineAsyncComponent } from 'vue';

const _Component = defineAsyncComponent({
	loader: () => import('./QuillEditor.vue'),

	delay: 200,

	timeout: 3000,
});

export const HTMLEditor = _Component;

export default _Component;
