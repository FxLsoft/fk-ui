import { computed, defineComponent, provide, reactive, ref, toRefs, watch } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { useFormItem } from '../_hooks/use-form-item';
import { isArray, isFunction, isNumber, isString } from '../_utils/is';
import { checkboxGroupKey } from './context';
import Checkbox from './checkbox';
import type { Direction } from '../_utils/constant';
import type { CheckboxOption } from './interface';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'CheckboxGroup',
	props: {
		/**
		 * @zh 绑定值
		 * @en Value
		 * @vModel
		 */
		modelValue: {
			type: Array as PropType<string | number | boolean | Array<string | number | boolean>>,
			default: undefined,
		},
		/**
		 * @zh 默认值（非受控状态）
		 * @en Default value (uncontrolled state)
		 */
		defaultValue: {
			type: Array as PropType<Array<string | number | boolean> | string | number | boolean>,
			default: () => [],
		},
		/**
		 * @zh 支持最多选中的数量
		 * @en Support the maximum number of selections
		 * @version 1.0.0
		 */
		max: {
			type: Number,
		},
		/**
		 * @zh 选项
		 * @en Options
		 * @version 1.0.0
		 */
		options: {
			type: Array as PropType<Array<string | number | CheckboxOption>>,
		},
		/**
		 * @zh 复选框的排列方向
		 * @en Arrangement direction of checkboxes
		 */
		direction: {
			type: String as PropType<Direction>,
			default: 'horizontal',
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
		 * @zh 是否多选
		 */
		multiple: {
			type: Boolean,
			default: true,
		},
	},
	emits: {
		'update:modelValue': (value: (string | number | boolean)[] | (string | number | boolean)) => true,
		/**
		 * @zh 值改变时触发
		 * @en Trigger when the value changes
		 * @param {(string | number | boolean)[]} value
		 * @param {Event} ev
		 */
		change: (value: (string | number | boolean)[] | (string | number | boolean), ev: Event) => true,
	},
	/**
	 * @zh checkbox 文案内容
	 * @en checkbox label content
	 * @slot label
	 * @binding {CheckboxOption} data
	 * @version 1.0.0
	 */
	/**
	 * @zh 自定义复选框
	 * @en Custom checkbox
	 * @slot checkbox
	 * @binding {boolean} checked
	 * @binding {boolean} disabled
	 * @version 1.0.0
	 */
	setup(props, { emit, slots }) {
		const { disabled } = toRefs(props);
		const prefixCls = getPrefixCls('checkbox-group');
		const { mergedDisabled, eventHandlers } = useFormItem({
			disabled,
		});
		function isEmptyValue(val) {
			if (typeof val === 'undefined' || val == null) {
				return true;
			}
			return false;
		}
		const _value = ref(props.defaultValue);
		const computedValue = computed(() => {
			if (isArray(props.modelValue)) {
				return props.modelValue;
			} else if (!isEmptyValue(props.modelValue)) {
				return [props.modelValue];
			} else if (isArray(_value.value)) {
				return _value.value;
			} else if (!isEmptyValue(_value.value)) {
				return [_value.value];
			} else {
				return [];
			}
		});
		const isMaxed = computed(() => (props.max === undefined ? false : computedValue.value.length >= props.max));

		const options = computed(() => {
			return (props.options ?? []).map(option => {
				if (isString(option) || isNumber(option)) {
					return {
						label: option,
						value: option,
					} as CheckboxOption;
				}
				return option;
			});
		});

		const handleChange = (value: Array<string | number> | string | number, e: Event) => {
			if (!props.multiple) {
				if (isArray(value)) {
					value = value[0];
				}
			}
			_value.value = value;
			emit('update:modelValue', value);
			emit('change', value, e);
			eventHandlers.value?.onChange?.(e);
		};

		provide(
			checkboxGroupKey,
			// @ts-ignore
			reactive({
				name: 'CheckboxGroup',
				computedValue,
				disabled: mergedDisabled,
				multiple: props.multiple,
				isMaxed,
				slots,
				handleChange,
			}),
		);

		const cls = computed(() => [prefixCls, `${prefixCls}-direction-${props.direction}`]);

		watch(
			() => props.modelValue,
			curValue => {
				if (isArray(curValue)) {
					_value.value = [...curValue];
				} else if (!isEmptyValue(curValue)) {
					_value.value = [curValue];
				} else {
					_value.value = [];
				}
			},
		);

		const renderOptions = () => {
			return options.value.map(option => {
				const checked = computedValue.value.includes(option.value);
				return (
					<Checkbox
						key={option.value}
						value={option.value}
						disabled={option.disabled || (!checked && isMaxed.value)}
						indeterminate={option.indeterminate}
						modelValue={checked}
					>
						{slots.label ? slots.label({ data: option }) : isFunction(option.label) ? option.label() : option.label}
					</Checkbox>
				);
			});
		};

		return () => <span class={cls.value}>{options.value.length > 0 ? renderOptions() : slots.default?.()}</span>;
	},
});
