import { getCurrentInstance, onUpdated, ref } from 'vue';
import { generateKey } from '../utils/tree-data';
import type { Ref } from 'vue';
import type { TreeNodeKey } from '../interface';

export default function useNodeKey(): Ref<TreeNodeKey> {
	const instance = getCurrentInstance();

	const getKey = () => (instance?.vnode.key ?? generateKey()) as TreeNodeKey;

	const key = ref(getKey());

	onUpdated(() => {
		key.value = getKey();
	});

	return key;
}
