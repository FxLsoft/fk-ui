<template>
	<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><path d="M13.45 14.043H8a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-4.893m-21.657 0c-1.036-2.833-.615-5.6 1.182-6.637 2.152-1.243 5.464.464 7.397 3.812.539.933.914 1.896 1.127 2.825m-9.706 0h9.706m0 0H25.4m0 0a10.31 10.31 0 0 1 1.128-2.825c1.933-3.348 5.244-5.055 7.397-3.812 1.797 1.037 2.217 3.804 1.182 6.637m-9.707 0h9.707M10 26.043a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2v-13Z"></path></svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getPrefixCls } from '../../utils/global-config';
import { isNumberSize } from '../../utils/is';
import type { CSSProperties } from 'vue';

defineOptions({
	name: 'IconGift',
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
const cls = computed(() => [prefixCls, `${prefixCls}-gift`, { [`${prefixCls}-spin`]: props.spin }]);
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
