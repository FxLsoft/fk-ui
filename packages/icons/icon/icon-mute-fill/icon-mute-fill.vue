<template>
	<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><path d="M5.931 13.001A2 2 0 0 0 4 15v18a2 2 0 0 0 2 2h7.37l9.483 6.639A2 2 0 0 0 26 40v-6.93L5.931 13.001ZM35.27 28.199l-3.311-3.313a7.985 7.985 0 0 0-1.96-6.107.525.525 0 0 1 .011-.718l2.122-2.122a.485.485 0 0 1 .7.008c3.125 3.393 3.938 8.15 2.439 12.252ZM41.13 34.059l-2.936-2.937c3.07-5.89 2.226-13.288-2.531-18.348a.513.513 0 0 1 .004-.713l2.122-2.122a.492.492 0 0 1 .703.006c6.322 6.64 7.202 16.56 2.639 24.114ZM26 18.928l-8.688-8.688 5.541-3.878A2 2 0 0 1 26 8v10.928Z" fill="currentColor" stroke="none"></path><path fill-rule="evenodd" clip-rule="evenodd" d="m7.012 4.184 35.272 35.272-2.828 2.828L4.184 7.012l2.828-2.828Z" fill="currentColor" stroke="none"></path></svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getPrefixCls } from '../../utils/global-config';
import { isNumberSize } from '../../utils/is';
import type { CSSProperties } from 'vue';

defineOptions({
	name: 'IconMuteFill',
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
const cls = computed(() => [prefixCls, `${prefixCls}-mute-fill`, { [`${prefixCls}-spin`]: props.spin }]);
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
