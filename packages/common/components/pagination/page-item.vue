<template>
	<li :class="cls" :style="mergedStyle" @click="handleClick">
		<slot :page="pageNumber">
			{{ pageNumber }}
		</slot>
	</li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import type { CSSProperties, PropType } from 'vue';

export default defineComponent({
	name: 'Pager',
	props: {
		pageNumber: {
			type: Number,
		},
		current: {
			type: Number,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		style: {
			type: Object as PropType<CSSProperties>,
		},
		activeStyle: {
			type: Object as PropType<CSSProperties>,
		},
	},
	emits: ['click'],
	setup(props, { emit }) {
		const prefixCls = getPrefixCls('pagination-item');
		const isActive = computed(() => props.current === props.pageNumber);

		const handleClick = (e: MouseEvent) => {
			if (!props.disabled) {
				emit('click', props.pageNumber, e);
			}
		};

		const cls = computed(() => [
			prefixCls,
			{
				[`${prefixCls}-active`]: isActive.value,
			},
		]);

		const mergedStyle = computed(() => {
			return isActive.value ? props.activeStyle : props.style;
		});

		return {
			prefixCls,
			cls,
			mergedStyle,
			handleClick,
		};
	},
});
</script>
