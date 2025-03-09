<template>
	<ButtonGroup>
		<Button v-if="!label" :size="size" :type="type" :disabled="disabled" v-bind="buttonProps" @click="handleClick">
			<slot />
		</Button>
		<Dropdown :popup-visible="computedPopupVisible" :trigger="trigger" :position="position"
			:popup-container="popupContainer" :hide-on-select="hideOnSelect" @select="handleSelect"
			@popup-visible-change="handlePopupVisibleChange" :show-arrow="true">
			<Button v-if="!label" :size="size" :type="type" :disabled="disabled">
				<template #icon>
					<slot name="icon" :popup-visible="computedPopupVisible">
						<IconMore />
					</slot>
				</template>
			</Button>
			<Button v-else :size="size" :type="type" :disabled="disabled" v-bind="buttonProps" @click="handleClick">
				{{ label }}
				<IconDown :class="`${prefixCls}-arrow-icon`" />
			</Button>
			<template #content>
				<slot name="content" />
			</template>
		</Dropdown>
	</ButtonGroup>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import IconMore from '../icon/icon-more';
import IconDown from '../icon/icon-down';
import Button, { ButtonGroup } from '../button';
import { getPrefixCls } from '../_utils/global-config';
import { useTrigger } from '../_hooks/use-trigger';
import Dropdown from './dropdown.vue';
import type { Size, TriggerEvent } from '../_utils/constant';
import type { ButtonProps } from '../button';
import type { PropType } from 'vue';
import { ButtonTypes } from '../button/constants';

type DropdownPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';

export default defineComponent({
	name: 'DropdownButton',
	components: {
		IconMore,
		Button,
		ButtonGroup,
		Dropdown,
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
			default: 'br',
		},
		/**
		 * @zh 弹出框的挂载容器
		 * @en Mount container for popup
		 */
		popupContainer: {
			type: [String, Object] as PropType<string | HTMLElement>,
		},
		/**
		 * @zh 是否禁用
		 * @en Whether to disable
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 按钮类型
		 * @en Button type
		 */
		type: {
			type: String as PropType<ButtonTypes>,
		},
		/**
		 * @zh 按钮大小
		 * @en Button size
		 */
		size: {
			type: String as PropType<Size>,
		},
		/**
		 * @zh 按钮属性
		 * @en Button props
		 */
		buttonProps: {
			type: Object as PropType<ButtonProps>,
		},
		/**
		 * @zh 是否在用户选择后隐藏弹出框
		 * @en Whether to hide popup when the user selects
		 */
		hideOnSelect: {
			type: Boolean,
			default: true,
		},

		/**
		 * @zh 标签
		 */
		label: {
			type: String
		}
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
		 * @zh 点击按钮时触发
		 * @en Emitted when the button is clicked
		 * @param {MouseEvent} ev
		 */
		click: (ev: MouseEvent) => true,
		/**
		 * @zh 用户选择时触发
		 * @en Triggered when the user selects
		 * @param {string | number | Record<string, any> | undefined} value
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
	 * @zh 按钮图标
	 * @en Button icon
	 * @slot icon
	 * @binding {boolean} popupVisible
	 */
	setup(props, { emit }) {
		const { defaultPopupVisible, popupVisible } = toRefs(props);
		const prefixCls = getPrefixCls('dropdown');

		const { computedPopupVisible, handlePopupVisibleChange } = useTrigger({
			defaultPopupVisible,
			popupVisible,
			emit,
		});

		const handleClick = (ev: MouseEvent) => {
			emit('click', ev);
		};

		const handleSelect = (value: string | number | Record<string, unknown> | undefined, ev: Event) => {
			emit('select', value, ev);
		};

		return {
			prefixCls,
			computedPopupVisible,
			handleClick,
			handleSelect,
			handlePopupVisibleChange,
		};
	},
});
</script>
