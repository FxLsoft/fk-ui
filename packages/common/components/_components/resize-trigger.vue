<template>
	<ResizeObserver @resize="onResize">
		<div :class="classNames">
			<!-- @slot 自定义内容 -->
			<slot>
				<div :class="`${prefixCls}-icon-wrapper`">
					<!-- @slot 自定义 icon -->
					<slot name="icon">
						<IconDragDot v-if="isHorizontal" :class="`${prefixCls}-icon`" />
						<IconDragDotVertical v-else :class="`${prefixCls}-icon`" />
					</slot>
				</div>
			</slot>
		</div>
	</ResizeObserver>
</template>
<script lang="tsx">
import { computed, defineComponent, toRefs } from 'vue';
import IconDragDot from '../icon/icon-drag-dot';
import IconDragDotVertical from '../icon/icon-drag-dot-vertical';
import ResizeObserver from './resize-observer';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'ResizeTrigger',
	components: {
		ResizeObserver,
		IconDragDot,
		IconDragDotVertical,
	},
	props: {
		prefixCls: {
			type: String,
			required: true,
		},
		direction: {
			type: String as PropType<'horizontal' | 'vertical'>,
			default: 'horizontal',
		},
	},
	emits: ['resize'],
	setup(props, { emit }) {
		const { direction, prefixCls } = toRefs(props);
		const isHorizontal = computed(() => direction?.value === 'horizontal');
		const classNames = computed(() => [
			prefixCls.value,
			{
				[`${prefixCls.value}-horizontal`]: isHorizontal.value,
				[`${prefixCls.value}-vertical`]: !isHorizontal.value,
			},
		]);
		const onResize = (entry: ResizeObserverEntry) => {
			emit('resize', entry);
		};

		return {
			classNames,
			onResize,
			isHorizontal,
		};
	},
});
</script>
