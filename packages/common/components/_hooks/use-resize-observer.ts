import { watchEffect } from 'vue';
import ResizeObserver from 'resize-observer-polyfill';
import { throttleByRaf } from '../_utils/throttle-by-raf';
import { isFunction } from '../_utils/is';
import type { ShallowRef } from 'vue';

/**
 * @zh 使用 ResizeObserver 监听元素大小变化
 * @param param0
 * @returns
 */
export const useResizeObserver = ({
	elementRef,
	onResize,
}: {
	elementRef: ShallowRef<HTMLElement | undefined> | ShallowRef<HTMLElement | undefined>[];
	onResize: (entry: ResizeObserverEntry) => void;
}) => {
	let resizeObserver: ResizeObserver | null;

	if (!Array.isArray(elementRef)) {
		elementRef = [elementRef];
	}
	const resize = (entry: ResizeObserverEntry) => {
		isFunction(onResize) && onResize(entry);
	};

	const createResizeObserver = () => {
		destroyResizeObserver();
		if (!elementRef.every(v => v.value)) return;
		resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			const entry = entries[0];
			resize(entry);
		});
		elementRef.forEach(ref => {
			if (ref.value) {
				resizeObserver.observe(ref.value);
			}
		});
	};

	const destroyResizeObserver = () => {
		if (resizeObserver) {
			resizeObserver.disconnect();
			resizeObserver = null;
		}
	};

	watchEffect(
		() => {
			if (elementRef.every(v => v.value) && elementRef.length) {
				createResizeObserver();
			} else {
				destroyResizeObserver();
			}
		},
		{
			flush: 'post',
		},
	);

	return {
		createResizeObserver,
		destroyResizeObserver,
	};
};
