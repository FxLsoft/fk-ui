import { computed, defineComponent, inject } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import IconDragDotVertical from '../icon/icon-drag-dot-vertical';
import Checkbox from '../checkbox';
import IconClose from '../icon/icon-close';
import Button from '../button';
import { transferInjectionKey } from './context';
import type { DraggableProps } from '../list/interface';
import type { TransferItem } from './interface';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'TransferListItem',
	props: {
		type: {
			type: String as PropType<'source' | 'target'>,
		},
		data: {
			type: Object as PropType<TransferItem>,
			required: true,
		},
		allowClear: {
			type: Boolean,
		},
		disabled: {
			type: Boolean,
		},
		draggable: {
			type: [Boolean, Object] as PropType<boolean | DraggableProps>,
		},
		simple: Boolean,
	},
	setup(props) {
		const prefixCls = getPrefixCls('transfer-list-item');
		const transferCtx = inject(transferInjectionKey, undefined);

		const handleClick = () => {
			if (props.simple && !props.disabled) {
				transferCtx?.moveTo([props.data.value], props.type === 'target' ? 'source' : 'target');
			}
		};

		const cls = computed(() => [
			prefixCls,
			{
				[`${prefixCls}-disabled`]: props.disabled,
				[`${prefixCls}-draggable`]: props.draggable,
			},
		]);

		const handleRemove = () => {
			transferCtx?.moveTo([props.data.value], 'source');
		};

		return () => (
			<div class={cls.value} onClick={handleClick}>
				{props.allowClear || props.simple ? (
					<span class={`${prefixCls}-content`}>{transferCtx?.slots.item?.(props.data, props.type) ?? props.data.label}</span>
				) : (
					<Checkbox
						class={[`${prefixCls}-content`, `${prefixCls}-checkbox`]}
						modelValue={transferCtx?.selected}
						value={props.data.value}
						onChange={(value: unknown) => transferCtx?.onSelect(value as string[])}
						uninjectGroupContext
						disabled={props.disabled}
					>
						{transferCtx?.slots.item?.(props.data, props.type) ?? props.data.label}
					</Checkbox>
				)}
				{props.allowClear && !props.disabled && (
					<IconHover class={`${prefixCls}-remove-btn`} onClick={handleRemove}>
						<IconClose />
					</IconHover>
				)}
				{props.draggable && !props.disabled && (
					<Button type="text" class={`${prefixCls}-draggable-btn draggable-handle`}>
						{{ icon: () => <IconDragDotVertical /> }}
					</Button>
				)}
			</div>
		);
	},
});
