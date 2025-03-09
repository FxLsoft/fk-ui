<template>
	<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.2 4C12.596 4 4 12.596 4 23.2v1.6C4 35.404 12.596 44 23.2 44h1.6C35.404 44 44 35.404 44 24.8v-1.6C44 12.596 35.404 4 24.8 4h-1.6Zm-9.086 10A2.114 2.114 0 0 0 12 16.114v15.772c0 1.167.947 2.114 2.114 2.114H25v-4h-9v-4h7.778v-4H16v-4h9v-4H14.114ZM32.4 22a5.4 5.4 0 0 0-5.4 5.4V34h4v-6.6a1.4 1.4 0 0 1 2.801 0V34h4v-6.6a5.4 5.4 0 0 0-5.4-5.4Z" fill="currentColor" stroke="none"></path></svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getPrefixCls } from '../../utils/global-config';
import { isNumberSize } from '../../utils/is';
import type { CSSProperties } from 'vue';

defineOptions({
	name: 'IconEnglishFill',
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
const cls = computed(() => [prefixCls, `${prefixCls}-english-fill`, { [`${prefixCls}-spin`]: props.spin }]);
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
