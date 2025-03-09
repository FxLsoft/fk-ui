<template>
	<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><path d="M16 16h16M16 24h8"></path><path d="M24 41H8V6h32v17"></path><path d="M30 29h11v13l-5.5-3.5L30 42V29Z"></path></svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getPrefixCls } from '../../utils/global-config';
import { isNumberSize } from '../../utils/is';
import type { CSSProperties } from 'vue';

defineOptions({
	name: 'IconBookmark',
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
const cls = computed(() => [prefixCls, `${prefixCls}-bookmark`, { [`${prefixCls}-spin`]: props.spin }]);
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
