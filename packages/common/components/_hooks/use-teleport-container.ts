import { onMounted, shallowRef, watch } from 'vue';
import { getElement } from '../_utils/dom';
import type { Ref } from 'vue';

export const useTeleportContainer = ({
	popupContainer,
	visible,
	defaultContainer = 'body',
	documentContainer,
}: {
	popupContainer: Ref<string | HTMLElement | undefined>;
	visible: Ref<boolean>;
	defaultContainer?: string;
	documentContainer?: boolean;
}) => {
	const teleportContainer = shallowRef(popupContainer.value);
	const containerRef = shallowRef<HTMLElement>();

	const getContainer = () => {
		const element = getElement(popupContainer.value);
		const _teleportContainer = element ? popupContainer.value : defaultContainer;
		const _containerElement = element ?? (documentContainer ? document.documentElement : getElement(defaultContainer));
		if (_teleportContainer !== teleportContainer.value) {
			teleportContainer.value = _teleportContainer;
		}
		if (_containerElement !== containerRef.value) {
			containerRef.value = _containerElement;
		}
	};

	onMounted(() => getContainer());

	watch(
		() => visible.value,
		n => {
			if (teleportContainer.value !== popupContainer.value && n) {
				getContainer();
			}
		},
		{
			flush: 'post',
		},
	);

	return {
		teleportContainer,
		containerRef,
	};
};
