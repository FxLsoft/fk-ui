<template>
	<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><path d="M43.277 13.575c0 16.613-10.912 28.575-26.962 29.1-6.788.525-11.438-1.537-15.6-4.65 4.65.525 10.912-1.012 13.987-4.163-4.65 0-7.275-2.625-8.812-6.187h4.162C5.89 26.1 2.74 22.987 2.74 17.812c1.012.525 2.062 1.013 4.162 1.013-3.637-2.063-5.7-8.813-3.112-12.975 4.65 5.175 10.35 9.863 19.762 10.35C20.927 5.85 34.465.6 40.165 7.388c2.625-.525 4.162-1.538 6.187-2.625-.525 2.625-2.062 4.162-4.162 5.175 2.062 0 3.637-.525 5.175-1.538-.488 2.063-2.55 4.162-4.088 5.175Z" fill="currentColor" stroke="none"></path></svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getPrefixCls } from '../../utils/global-config';
import { isNumberSize } from '../../utils/is';
import type { CSSProperties } from 'vue';

defineOptions({
	name: 'IconTwitter',
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
const cls = computed(() => [prefixCls, `${prefixCls}-twitter`, { [`${prefixCls}-spin`]: props.spin }]);
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
