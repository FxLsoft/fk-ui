<template>
	<Trigger
		:popup-visible="computedPopupVisible"
		animation-name="slide-dynamic-origin"
		auto-fit-transform-origin
		:trigger="trigger"
		:position="position"
		:popup-offset="4"
		:popup-container="popupContainer"
		:opened-class="`${prefixCls}-open`"
		@popup-visible-change="handlePopupVisibleChange"
	>
		<slot />
		<IconDown v-if="showArrowDown" :class="`${prefixCls}-arrow-icon`" />
		<template #content>
			<DropdownPanel :class="dropdownClass">
				<slot name="content" />
				<template v-if="$slots.footer" #footer>
					<slot name="footer" />
				</template>
			</DropdownPanel>
		</template>
	</Trigger>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRefs } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import Trigger from '../trigger';
import { useTrigger } from '../_hooks/use-trigger';
import IconDown from '../icon/icon-down';
import DropdownPanel from './dropdown-panel.vue';
import { dropdownInjectionKey } from './context';
import type { TriggerEvent } from '../_utils/constant';
import type { PropType } from 'vue';
import type { DropdownPosition } from './interface';

export default defineComponent({
	name: 'Dropdown',
	components: {
		Trigger,
		DropdownPanel,
		IconDown,
	},
	props: {
		/**
		 * @zh 弹出框是否可见
		 * @en Whether the popup is visible
		 * @vModel
		 */
		popupVisible: {
			type: Boolean,
			default: undefined,
		},
		/**
		 * @zh 弹出框默认是否可见（非受控模式）
		 * @en Whether the popup is visible by default (uncontrolled mode)
		 */
		defaultPopupVisible: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 触发方式
		 * @en Trigger method
		 * @values 'hover','click','focus','contextMenu'
		 */
		trigger: {
			type: [String, Array] as PropType<TriggerEvent | TriggerEvent[]>,
			default: 'click',
		},
		/**
		 * @zh 弹出位置
		 * @en Popup position
		 * @values 'top','tl','tr','bottom','bl','br'
		 */
		position: {
			type: String as PropType<DropdownPosition>,
			default: 'bottom',
		},
		/**
		 * @zh 弹出框的挂载容器
		 * @en Mount container for popup
		 */
		popupContainer: {
			type: [String, Object] as PropType<string | HTMLElement>,
		},
		popupMaxHeight: {
			type: [Boolean, Number],
			default: true,
		},
		/**
		 * @zh 是否在用户选择后隐藏弹出框
		 * @en Whether to hide popup when the user selects
		 * @version 1.0.0
		 */
		hideOnSelect: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh 显现下拉箭头
		 */
		showArrowDown: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 下拉面板样式
		 */
		dropdownClass: {
			type: String,
		},
	},
	emits: {
		'update:popupVisible': (visible: boolean) => true,
		/**
		 * @zh 下拉框显示状态发生改变时触发
		 * @en Triggered when the display status of the drop-down box changes
		 * @param {boolean} visible
		 */
		popupVisibleChange: (visible: boolean) => true,
		/**
		 * @zh 用户选择时触发
		 * @en Triggered when the user selects
		 * @param {string | number | Record<string, any> | undefined } value
		 * @param {Event} ev
		 */
		select: (value: string | number | Record<string, any> | undefined, ev: Event) => true,
	},
	/**
	 * @zh 内容
	 * @en Content
	 * @slot content
	 */
	/**
	 * @zh 页脚
	 * @en Footer
	 * @slot footer
	 * @version 1.0.0
	 */
	setup(props, { emit }) {
		const { defaultPopupVisible, popupVisible, popupMaxHeight } = toRefs(props);
		const prefixCls = getPrefixCls('dropdown');

		const { computedPopupVisible, handlePopupVisibleChange } = useTrigger({
			defaultPopupVisible,
			popupVisible,
			emit,
		});

		const handleOptionClick = (value: string | number | Record<string, any> | undefined, ev: Event) => {
			emit('select', value, ev);
			props.hideOnSelect && handlePopupVisibleChange(false);
		};

		provide(
			dropdownInjectionKey,
			reactive({
				popupMaxHeight,
				onOptionClick: handleOptionClick,
			}),
		);

		return {
			prefixCls,
			computedPopupVisible,
			handlePopupVisibleChange,
		};
	},
});
</script>
