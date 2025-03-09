<template>
	<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><path d="M10 22a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1V22ZM23 11h11a6 6 0 0 1 6 6v6M22.5 12.893 19.587 11 22.5 9.107v3.786Z"></path></svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getPrefixCls } from '../../utils/global-config';
import { isNumberSize } from '../../utils/is';
import type { CSSProperties } from 'vue';

defineOptions({
	name: 'IconRotateLeft',
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
const cls = computed(() => [prefixCls, `${prefixCls}-rotate-left`, { [`${prefixCls}-spin`]: props.spin }]);
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
