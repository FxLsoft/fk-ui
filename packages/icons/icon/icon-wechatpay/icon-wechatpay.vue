<template>
	<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" :class="cls" :style="innerStyle" :stroke-width="strokeWidth" :stroke-linecap="strokeLinecap" :stroke-linejoin="strokeLinejoin" @click="onClick"><path d="M17.514 29.52a1.502 1.502 0 0 1-.715.165c-.608 0-1.104-.33-1.38-.826l-.113-.219-4.357-9.493c-.054-.112-.054-.219-.054-.33 0-.444.331-.774.774-.774.165 0 .33.053.496.165l5.13 3.643c.384.218.827.384 1.323.384.277 0 .55-.054.827-.166l24.058-10.704C39.2 6.288 32.085 2.976 24.026 2.976 10.896 2.976.191 11.861.191 22.837c0 5.958 3.2 11.366 8.22 15.008.383.278.66.774.66 1.27 0 .165-.053.33-.112.496-.384 1.488-1.05 3.92-1.05 4.026a2.025 2.025 0 0 0-.112.608c0 .443.33.774.773.774.165 0 .33-.054.443-.166l5.184-3.034c.384-.219.826-.384 1.27-.384.218 0 .495.053.714.112a27.712 27.712 0 0 0 7.781 1.104c13.13 0 23.835-8.886 23.835-19.862 0-3.312-.992-6.453-2.704-9.216L17.679 29.408l-.165.112Z" fill="currentColor" stroke="none"></path></svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getPrefixCls } from '../../utils/global-config';
import { isNumberSize } from '../../utils/is';
import type { CSSProperties } from 'vue';

defineOptions({
	name: 'IconWechatpay',
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
const cls = computed(() => [prefixCls, `${prefixCls}-wechatpay`, { [`${prefixCls}-spin`]: props.spin }]);
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
