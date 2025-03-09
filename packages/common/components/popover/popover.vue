<template>
	<Trigger
		:class="prefixCls"
		:trigger="trigger"
		:position="position"
		:popup-visible="computedPopupVisible"
		:popup-offset="10"
		:content-class="contentCls"
		:content-style="contentStyle"
		:arrow-class="arrowCls"
		:arrow-style="arrowStyle"
		show-arrow
		:popup-container="popupContainer"
		animation-name="zoom-in-fade-out"
		auto-fit-transform-origin
		@popup-visible-change="handlePopupVisibleChange"
	>
		<slot />
		<template #content>
			<div v-if="isShowTitle" :class="`${prefixCls}-title`">
				<slot name="title">{{ title }}</slot>
			</div>
			<div v-if="isShowContent" :class="`${prefixCls}-content`">
				<slot name="content">{{ content }}</slot>
			</div>
		</template>
	</Trigger>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { isUndefined } from '../_utils/is';
import { getPrefixCls } from '../_utils/global-config';
import Trigger from '../trigger';
import type { ClassName } from '../_utils/types';
import type { TriggerEvent, TriggerPosition } from '../_utils/constant';
import type { CSSProperties, PropType } from 'vue';

export default defineComponent({
	name: 'Popover',
	components: {
		Trigger,
	},
	props: {
		/**
		 * @zh 文字气泡是否可见
		 * @en Whether the popover is visible
		 * @vModel
		 */
		popupVisible: {
			type: Boolean,
			default: undefined,
		},
		/**
		 * @zh 文字气泡默认是否可见（非受控模式）
		 * @en Whether the popover is visible by default (uncontrolled mode)
		 */
		defaultPopupVisible: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 标题
		 * @en Title
		 */
		title: String,
		/**
		 * @zh 内容
		 * @en Content
		 */
		content: String,
		/**
		 * @zh 触发方式
		 * @en Trigger method
		 * @values 'hover','click','focus','contextMenu'
		 */
		trigger: {
			type: [String, Array] as PropType<TriggerEvent | TriggerEvent[]>,
			default: 'hover',
		},
		/**
		 * @zh 弹出位置
		 * @en Pop-up position
		 * @values 'top','tl','tr','bottom','bl','br','left','lt','lb','right','rt','rb'
		 */
		position: {
			type: String as PropType<TriggerPosition>,
			default: 'top',
		},
		/**
		 * @zh 弹出框内容的类名
		 * @en The class name of the popup content
		 */
		contentClass: {
			type: [String, Array, Object] as PropType<ClassName>,
		},
		/**
		 * @zh 弹出框内容的样式
		 * @en The style of the popup content
		 */
		contentStyle: {
			type: Object as PropType<CSSProperties>,
		},
		/**
		 * @zh 弹出框箭头的类名
		 * @en The class name of the popup arrow
		 */
		arrowClass: {
			type: [String, Array, Object] as PropType<ClassName>,
		},
		/**
		 * @zh 弹出框箭头的样式
		 * @en The style of the popup arrow
		 */
		arrowStyle: {
			type: Object as PropType<CSSProperties>,
		},
		/**
		 * @zh 弹出框的挂载容器
		 * @en Mount container for pop-up box
		 */
		popupContainer: {
			type: [String, Object] as PropType<string | HTMLElement>,
		},
	},
	emits: {
		'update:popupVisible': (visible: boolean) => true,
		/**
		 * @zh 文字气泡显示状态改变时触发
		 * @en Triggered when the text bubble display status changes
		 * @param {boolean} visible
		 */
		popupVisibleChange: (visible: boolean) => true,
	},
	/**
	 * @zh 标题
	 * @en Title
	 * @slot title
	 */
	/**
	 * @zh 内容
	 * @en Content
	 * @slot content
	 */
	setup(props, { emit, slots }) {
		const prefixCls = getPrefixCls('popover');

		const _popupVisible = ref(props.defaultPopupVisible);
		const computedPopupVisible = computed(() => props.popupVisible ?? _popupVisible.value);

		const handlePopupVisibleChange = (visible: boolean) => {
			_popupVisible.value = visible;
			emit('update:popupVisible', visible);
			emit('popupVisibleChange', visible);
		};

		const contentCls = computed(() => [`${prefixCls}-popup-content`, props.contentClass]);

		const arrowCls = computed(() => [`${prefixCls}-popup-arrow`, props.arrowClass]);

		const isShowTitle = computed(() => {
			return props.title || slots.title;
		});

		const isShowContent = computed(() => {
			return props.content || slots.content;
		});

		watch(
			() => props.popupVisible,
			val => {
				if (isUndefined(val)) {
					_popupVisible.value = false;
				}
			},
		);

		return {
			prefixCls,
			computedPopupVisible,
			contentCls,
			arrowCls,
			isShowTitle,
			isShowContent,
			handlePopupVisibleChange,
		};
	},
});
</script>
