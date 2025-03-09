import { computed, isRef, onMounted, onUnmounted } from 'vue';
import ResponsiveObserve from '../_utils/responsive-observe';
import type { Ref } from 'vue';
import type { Breakpoint } from '../_utils/responsive-observe';

export function useResponsive(breakpoint: Breakpoint | undefined | Ref<Breakpoint | undefined>, callback: (checked: boolean) => void) {
	const resultBreakpoint = computed(() => (isRef(breakpoint) ? breakpoint.value : breakpoint));
	// Subscription Responsive
	let subscribeToken = '';
	onMounted(() => {
		subscribeToken = ResponsiveObserve.subscribe((screens, breakpointChecked) => {
			if (!resultBreakpoint.value) return;
			if (!breakpointChecked || breakpointChecked === resultBreakpoint.value) {
				callback(!!screens[resultBreakpoint.value]);
			}
		});
	});
	// Unsubscribe
	onUnmounted(() => {
		if (subscribeToken) {
			ResponsiveObserve.unsubscribe(subscribeToken);
		}
	});
}
