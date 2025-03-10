import { onMounted, onUpdated, shallowRef } from 'vue';
import { getFirstElementFromChildren } from '../_utils/vue-utils';
import type { SlotChildren } from '../_utils/types';

export const useFirstElement = () => {
	// only save VNodes reference, not use ref
	const children: SlotChildren = {};
	const firstElement = shallowRef<HTMLElement>();

	const getFirstElement = () => {
		const element = getFirstElementFromChildren(children.value);
		if (element !== firstElement.value) {
			firstElement.value = element;
		}
	};

	onMounted(() => getFirstElement());

	onUpdated(() => getFirstElement());

	return {
		children,
		firstElement,
	};
};
