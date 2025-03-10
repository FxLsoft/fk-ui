import { onMounted, onUpdated, ref } from 'vue';
import { getComponentsFromChildren } from '../_utils/vue-utils';
import type { SlotChildren } from '../_utils/types';

export const useChildrenComponents = (name: string) => {
	// only save VNodes reference, not use ref
	const children: SlotChildren = {};
	const components = ref<number[]>([]);

	const getComponents = () => {
		if (children.value) {
			const _components = getComponentsFromChildren(children.value, name);
			if (_components.length !== components.value.length || _components.toString() !== components.value.toString()) {
				components.value = _components;
			}
		}
	};

	onMounted(() => getComponents());

	onUpdated(() => getComponents());

	return {
		children,
		components,
	};
};
