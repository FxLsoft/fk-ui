import { computed, defineComponent, h, inject, ref } from 'vue';
import { get, isFunction, isObject, isString, set } from 'xe-utils';
import { ExpandTransition, IconDown, Tooltip } from '@erp/common';
import Input from '../input';
import { ON_UPDATE_MODEL } from '../../utils/constants';
import { useOptionDataHook } from '../input/hooks';
import { SearchFormContextKey } from './interface';
import type { CustomFormFieldComponentProps, FormFieldI, LabelLayoutType } from './interface';
import type { Size } from '@erp/common';
import type { Component, PropType } from 'vue';

/**
 * 筛选组件子组件的渲染
 */
export const FormFieldComponent = defineComponent({
	name: 'SearchFormField',
	inheritAttrs: true,
	props: {
		/**
		 * 表单数据模型
		 */
		model: {
			type: Object as PropType<Record<string, any>>,
			required: true,
		},
		/**
		 * 表单配置
		 */
		field: {
			type: Object as PropType<FormFieldI>,
			required: true,
		},
		/**
		 * 自定义组件
		 */
		components: {
			type: Object as PropType<Record<string, Component>>,
		},

		/**
		 * @zh 输入框大小
		 * @en Input size
		 * @values 'mini','small','medium','large'
		 * @defaultValue 'medium'
		 */
		size: {
			type: String as PropType<Size>,
		},

		/**
		 * label标签布局
		 */
		labelLayout: {
			type: String as PropType<LabelLayoutType>,
		},
	},
	emits: {
		change: (value: any) => true,
	},
	setup(props, { emit, slots, attrs }) {
		const field = props.field;
		const context = inject(SearchFormContextKey);
		const { options, loading } = useOptionDataHook(props.field);
		const isExpandInput = ref(true);
		const isExpandField = ref(false);
		const renderInput = () => {
			let placeholder = field.placeholder;
			if (props.labelLayout === 'inner') {
				if (!Array.isArray(field.placeholder)) {
					placeholder = field.label || field.placeholder;
				}
			}
			return (
				<Input
					key={`Input_${field.$id}`}
					modelValue={get(props.model, field.key)}
					type={field.type}
					multiple={field.multiple}
					disabled={field.disabled}
					placeholder={placeholder}
					options={options.value}
					loading={loading.value}
					onUpdate:modelValue={value => set(props.model, field.key, value)}
					onChange={value => emit('change', value)}
					size={props.size}
					{...field.componentProps}
				/>
			);
		};

		const renderTooltip = () => {
			if (!field.tooltip) {
				return null;
			}
			return (
				<Tooltip content={field.tooltip}>
					<icon-question-circle class="search-form-tooltip" />
				</Tooltip>
			);
		};

		const renderLabel = () => {
			return (
				<div class="field-label">
					{field.label}
					{renderTooltip()}
				</div>
			);
		};

		const renderFieldInput = () => {
			if (props.labelLayout === 'inner') {
				return [renderInput(), renderTooltip()];
			} else {
				return [renderLabel(), renderInput()];
			}
		};
		// 渲染自定义组件
		const renderCustomComponent = () => {
			const fieldProps: CustomFormFieldComponentProps = {
				key: field.$id,
				model: props.model,
				field,
				modelValue: get(props.model, field.key),
				options: options.value,
				loading: loading.value,
				[ON_UPDATE_MODEL]: value => set(props.model, field.key, value),
				onChange: value => emit('change', value),
				...field.componentProps,
			};
			if (props.labelLayout === 'expand') {
				fieldProps.onExpandInput = value => handleExpandInput(value);
				fieldProps.onExpandField = value => handleExpandField(value);
				fieldProps.isExpandInput = isExpandInput.value;
				fieldProps.isExpandField = isExpandField.value;
			}
			let comp: any;
			if (isString(field.component)) {
				comp = context.components?.[field.component] || context.slots[field.component];
			} else if (isObject(field.component)) {
				comp = field.component;
			} else if (isFunction(field.component)) {
				comp = field.component;
			}
			if (!comp) {
				console.warn(`${field.key} 对应的自定义组件不存在`);
				return null;
			}
			return h(comp, fieldProps);
		};

		const renderField = () => {
			if (field.type === 'custom') {
				return renderCustomComponent();
			} else {
				return <div class="field-input">{renderFieldInput()}</div>;
			}
		};

		const handleExpandInput = (isExpand?: boolean) => {
			isExpandInput.value = isExpand ?? !isExpandInput.value;
		};

		const handleExpandField = (isExpand?: boolean) => {
			isExpandField.value = isExpand ?? !isExpandField.value;
		};

		// 渲染自带展开收起功能
		const renderExpandField = () => {
			return [
				field.label ? (
					<div key="field-label" class="field-label field-expand-label" onClick={e => handleExpandInput()}>
						<span class="field-label-text">
							{field.label} {renderTooltip()}
						</span>
						<IconDown class="field-expand-btn" />
					</div>
				) : null,
				<ExpandTransition key="expand">
					<div v-show={isExpandInput.value} class="field-input">
						{field.type === 'custom' ? renderCustomComponent() : renderInput()}
					</div>
				</ExpandTransition>,
				field.showExpand ? (
					<div onClick={e => handleExpandField()} class="field-bottom-expand" key="field-bottom-expand">
						<span>{isExpandField.value ? '收起' : '展开'}</span>
						<IconDown class="field-bottom-expand-btn" />
					</div>
				) : null,
			];
		};

		const className = computed(() => {
			return [
				'field-wrap',
				{ 'field-input-close': !isExpandInput.value, 'field-expand-show': field.showExpand, 'field-close': field.showExpand && !isExpandField.value },
			];
		});

		const render = () => {
			return (
				<div class={className.value} title={field.label}>
					{props.labelLayout === 'expand' ? renderExpandField() : renderField()}
				</div>
			);
		};

		return {
			render,
		};
	},
	render() {
		return this.render();
	},
});
