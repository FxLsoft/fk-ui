<template>
	<div ref="domRef" :class="classNames" :style="style">
		<slot v-if="hasLoaded" :overflow="overflow" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, toRefs, watchEffect } from 'vue';
import { useIndex } from '../_hooks/use-index';
import { getPrefixCls } from '../_utils/global-config';
import { GridContextInjectionKey, GridDataCollectorInjectionKey } from './context';
import { useResponsiveState } from './hook/use-responsive-state';
import { resolveItemData } from './utils';
import type { ResponsiveValue } from './interface';
import type { PropType } from 'vue';

/**
 * @version 1.0.0
 * @zh 响应式配置从 `1.0.0` 开始支持，具体配置 [ResponsiveValue](#responsivevalue)
 * @en Responsive configuration has been supported since `1.0.0`, the specific configuration [ResponsiveValue](#responsivevalue)
 */
export default defineComponent({
	name: 'GridItem',
	props: {
		/**
		 * @zh 跨越的格数
		 * @en Number of grids spanned
		 */
		span: {
			type: [Number, Object] as PropType<number | ResponsiveValue>,
			default: 1,
		},
		/**
		 * @zh 左侧的间隔格数
		 * @en Number of grids on the left
		 */
		offset: {
			type: [Number, Object] as PropType<number | ResponsiveValue>,
			default: 0,
		},
		/**
		 * @zh 是否是后缀元素
		 * @en Is it a suffix element
		 */
		suffix: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const prefixCls = getPrefixCls('grid-item');
		const domRef = ref<HTMLDivElement>();
		const gridDataCollector = inject(GridDataCollectorInjectionKey);
		const realIndex = computed(() => {
			return gridDataCollector?.getIndex();
		});
		const { computedIndex } = useIndex({
			itemRef: domRef,
			selector: `.${prefixCls}`,
		});

		const gridContext = inject(GridContextInjectionKey, {
			overflow: false,
			displayIndexList: [],
			cols: 24,
			colGap: 0,
		});
		const visible = computed(() => gridContext?.displayIndexList?.includes(computedIndex.value));
		const { span: propSpan, offset: propOffset } = toRefs(props);
		const rSpan = useResponsiveState(propSpan, 1);
		const rOffset = useResponsiveState(propOffset, 0);
		const itemData = computed(() =>
			resolveItemData(gridContext.cols, {
				...props,
				span: rSpan.value,
				offset: rOffset.value,
				index: computedIndex.value,
			}),
		);

		const classNames = computed(() => [prefixCls]);
		const offsetStyle = computed(() => {
			const { offset, span } = itemData.value;
			const { colGap } = gridContext;
			if (offset > 0) {
				const oneSpan = `(100% - ${colGap * (span - 1)}px) / ${span}`;
				return {
					'margin-left': `calc((${oneSpan} * ${offset}) + ${colGap * offset}px)`,
				};
			}
			return {};
		});
		const columnStart = computed(() => {
			const { suffix, span } = itemData.value;
			const { cols } = gridContext;
			if (suffix) {
				return `${cols - span + 1}`;
			}
			return `span ${span}`;
		});
		const style = computed(() => {
			const { span } = itemData.value;
			if (domRef.value) {
				return [
					{
						'grid-column': `${columnStart.value} / span ${span}`,
					},
					offsetStyle.value,
					!visible.value || span === 0 ? { display: 'none' } : {},
				];
			}
			return [];
		});

		const hasLoaded = ref(false);

		watchEffect(() => {
			if (realIndex.value !== -1 && computedIndex.value !== -1) {
				gridDataCollector?.collectItemData(realIndex.value, itemData.value);
			}
		});

		onBeforeUnmount(() => {
			if (realIndex.value !== -1) {
				gridDataCollector?.removeItemData(realIndex.value);
			}
		});

		onMounted(() => {
			nextTick(() => {
				hasLoaded.value = true;
			});
		});

		return {
			hasLoaded,
			classNames,
			style,
			domRef,
			overflow: computed(() => gridContext.overflow),
		};
	},
});
</script>
