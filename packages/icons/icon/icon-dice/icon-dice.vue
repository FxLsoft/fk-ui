<template>
	<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><rect x="6.998" y="7" width="34" height="34" rx="1.5"></rect><circle cx="16" cy="16" r="2"></circle><circle cx="24" cy="24" r="2"></circle><circle cx="16" cy="32" r="2"></circle><circle cx="32" cy="16" r="2"></circle><circle cx="32" cy="32" r="2"></circle><circle cx="16" cy="16" r="2" fill="currentColor" stroke="none"></circle><circle cx="24" cy="24" r="2" fill="currentColor" stroke="none"></circle><circle cx="16" cy="32" r="2" fill="currentColor" stroke="none"></circle><circle cx="32" cy="16" r="2" fill="currentColor" stroke="none"></circle><circle cx="32" cy="32" r="2" fill="currentColor" stroke="none"></circle></svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getPrefixCls } from '../../utils/global-config';
import { isNumberSize } from '../../utils/is';
import type { CSSProperties } from 'vue';

defineOptions({
	name: 'IconDice',
});

const props = withDefaults(
	defineProps<{
		size?: string | number;
		strokeWidth?: number;
		strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
		strokeLinejoin?: 'round' | 'inherit' | 'bevel' | 'miter';
		rotate?: number;
		spin?: boolean;
	}>(),
	{
		strokeWidth: 4,
		strokeLinecap: 'butt',
		strokeLinejoin: 'miter',
	},
);

const emit = defineEmits<{
	click: [evt: MouseEvent];
}>();

const prefixCls = getPrefixCls('icon');
const cls = computed(() => [prefixCls, `${prefixCls}-dice`, { [`${prefixCls}-spin`]: props.spin }]);
const innerStyle = computed(() => {
	const styles: CSSProperties = {};
	if (props.size) {
		styles.fontSize = isNumberSize(props.size) ? `${props.size}px` : props.size;
	}
	if (props.rotate) {
		styles.transform = `rotate(${props.rotate}deg)`;
	}
	return styles;
});
const onClick = (ev: MouseEvent) => {
	emit('click', ev);
};
</script>
