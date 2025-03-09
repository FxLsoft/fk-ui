import { inject } from 'vue';
import { TreeInjectionKey } from '../context';
import type { TreeContext } from '../context';

export default function useTreeContext(): Partial<TreeContext> {
	const treeContext = inject<TreeContext>(TreeInjectionKey);
	return treeContext || {};
}
