import { ref } from 'vue';
import { off, on } from '../../_utils/dom';
import type { Ref } from 'vue';

export const useDraggable = ({
	modalRef,
	wrapperRef,
	draggable,
	alignCenter,
}: {
	modalRef: Ref<HTMLElement | undefined>;
	wrapperRef: Ref<HTMLElement | undefined>;
	draggable: Ref<boolean>;
	alignCenter: Ref<boolean>;
}) => {
	const isDragging = ref(false);
	const startMouse = ref([0, 0]);

	const initialPosition = ref([0, 0]);

	const position = ref<[number, number]>([0, 0]);

	const minPosition = ref<[number, number]>([0, 0]);

	const maxPosition = ref<[number, number]>([0, 0]);

	const getInitialPosition = () => {
		if (wrapperRef.value && modalRef.value) {
			const { top: wrapperTop, left: wrapperLeft, width: wrapperWidth, height: wrapperHeight } = wrapperRef.value.getBoundingClientRect();
			// const { clientWidth: wrapperWidth, clientHeight: wrapperHeight } = wrapperRef.value;
			const { top, left, width, height } = modalRef.value.getBoundingClientRect();
			maxPosition.value = [
				wrapperLeft + wrapperWidth - left - width + initialPosition.value[0],
				wrapperTop + wrapperHeight - top - height + initialPosition.value[1],
			];
			minPosition.value = [wrapperLeft - left + initialPosition.value[0], wrapperTop - top + initialPosition.value[1]];
			// subtract the top prop value when the alignCenter is false
			// const offsetTop = alignCenter.value ? 0 : modalRef.value?.offsetTop;
			// const initialX = left - wrapperLeft;
			// const initialY = top - wrapperTop - offsetTop;
			// if (initialX !== initialPosition.value?.[0] || initialY !== initialPosition.value?.[1]) {
			// 	initialPosition.value = [initialX, initialY];
			// }
			// const maxX = left - wrapperLeft;
			// const maxY = wrapperHeight > height ? wrapperHeight - height - offsetTop : 0;
			// if (maxX !== maxPosition.value[0] || maxY !== maxPosition.value[1]) {
			// 	maxPosition.value = [maxX, maxY];
			// }

			// if (offsetTop) {
			// 	minPosition.value = [0, 0 - offsetTop];
			// }
		}
	};

	const handleMoveDown = (ev: MouseEvent) => {
		if (draggable.value) {
			ev.preventDefault();
			isDragging.value = true;
			initialPosition.value = [position.value[0] || 0, position.value[1] || 0];
			getInitialPosition();
			startMouse.value = [ev.x, ev.y];
			on(window, 'mousemove', handleMouseMove);
			on(window, 'mouseup', handleMouseUp);
			on(window, 'contextmenu', handleMouseUp);
		}
	};

	const handleMouseMove = (ev: MouseEvent) => {
		if (isDragging.value) {
			const diffX = ev.x - startMouse.value[0];
			const diffY = ev.y - startMouse.value[1];

			let x = initialPosition.value[0] + diffX;
			let y = initialPosition.value[1] + diffY;

			// eslint-disable-next-line prefer-destructuring
			if (x < minPosition.value[0]) x = minPosition.value[0];
			// eslint-disable-next-line prefer-destructuring
			if (x > maxPosition.value[0]) x = maxPosition.value[0];
			// eslint-disable-next-line prefer-destructuring
			if (y < minPosition.value[1]) y = minPosition.value[1];
			// eslint-disable-next-line prefer-destructuring
			if (y > maxPosition.value[1]) y = maxPosition.value[1];

			position.value = [x, y];

			if (modalRef.value) {
				modalRef.value.style.transform = `translate(${position.value[0]}px, ${position.value[1]}px)`;
			}
		}
	};

	const handleMouseUp = () => {
		isDragging.value = false;
		off(window, 'mousemove', handleMouseMove);
		off(window, 'mouseup', handleMouseUp);
		off(window, 'contextmenu', handleMouseUp);
	};

	const resetPosition = () => {
		position.value = [0, 0];
		if (modalRef.value) {
			modalRef.value.style.transform = '';
		}
	};

	return {
		position,
		resetPosition,
		handleMoveDown,
	};
};
