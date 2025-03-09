<template>
	<div :class="prefixCls">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRefs } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { buttonGroupInjectionKey } from './context';
import type { ButtonTypes } from './constants';
import type { BorderShape, Size, Status } from '../_utils/constant';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'ButtonGroup',
	props: {
		/**
		 * @zh 按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。
		 * @en Children button types are divided into five types: secondary, primary, dashed, outline and text.
		 */
		type: {
			type: String as PropType<ButtonTypes>,
		},
		/**
		 * @zh 按钮的状态
		 * @en Children button state
		 * @values 'normal','warning','success','danger'
		 */
		status: {
			type: String as PropType<Status>,
		},
		/**
		 * @zh 按钮的形状
		 * @en Button shape
		 */
		shape: {
			type: String as PropType<BorderShape>,
		},
		/**
		 * @zh 按钮的尺寸
		 * @en Children button size
		 * @values 'mini','small','medium','large'
		 */
		size: {
			type: String as PropType<Size>,
		},
		/**
		 * @zh 全部子按钮是否禁用
		 * @en All children whether the button is disabled
		 */
		disabled: {
			type: Boolean,
		},
	},
	setup(props) {
		const { type, size, status, disabled, shape } = toRefs(props);
		const prefixCls = getPrefixCls('btn-group');

		provide(
			buttonGroupInjectionKey,
			reactive({
				type,
				size,
				shape,
				status,
				disabled,
			}),
		);

		return {
			prefixCls,
		};
	},
});
</script>
