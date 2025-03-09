<template>
	<slot v-if="noStyle" :id="fieldId" />
	<FormRow
		v-else
		:id="fieldId"
		:class="[
			cls,
			{
				[`${prefixCls}-has-help`]: Boolean($slots.help ?? help),
			},
		]"
		:wrap="!(labelColFlex || autoLabelWidth)"
		:div="layout !== 'horizontal' || hideLabel"
		v-bind="rowProps"
	>
		<FormCol v-if="!hideLabel" :class="labelColCls" :style="mergedLabelStyle" v-bind="mergedLabelCol">
			<FormItemLabel
				:required="hideAsterisk ? false : isRequired"
				:show-colon="showColon"
				:asterisk-position="asteriskPosition"
				:component="labelComponent"
				:attrs="labelAttrs"
				:tooltip="tooltip"
			>
				<slot v-if="$slots.label || label" name="label">{{ label }}</slot>
			</FormItemLabel>
		</FormCol>
		<FormCol :class="wrapperColCls" :style="mergedWrapperStyle" v-bind="mergedWrapperCol">
			<div :class="`${prefixCls}-content-wrapper`">
				<div
					:class="[
						`${prefixCls}-content`,
						{
							[`${prefixCls}-content-flex`]: contentFlex,
						},
						contentClass,
					]"
				>
					<slot name="prefix" />
					<slot />
					<slot name="suffix" />
				</div>
			</div>
			<FormItemMessage v-if="isError || $slots.help || help" :error="finalMessage" :help="help">
				<template v-if="$slots.help" #help>
					<slot name="help" />
				</template>
			</FormItemMessage>
			<div v-if="$slots.extra || extra" :class="`${prefixCls}-extra`">
				<slot name="extra">{{ extra }}</slot>
			</div>
		</FormCol>
	</FormRow>
</template>

<script lang="ts">
import { computed, defineComponent, inject, nextTick, onBeforeUnmount, onMounted, provide, reactive, ref, toRef, toRefs } from 'vue';
import { Schema } from 'b-validate';
import { Col as FormCol, Row as FormRow } from '../grid';
import { getPrefixCls } from '../_utils/global-config';
import { getValueByPath, setValueByPath } from '../_utils/get-value-by-path';
import { useI18n } from '../locale';
import { getFinalValidateMessage, getFinalValidateStatus, getFormElementId } from './utils';
import FormItemMessage from './form-item-message.vue';
import FormItemLabel from './form-item-label.vue';
import { formInjectionKey, formItemInjectionKey } from './context';
import type { Data } from '../_utils/types';
import type { FieldData, FieldRule, FormItemEventHandler, ValidateStatus, ValidateTrigger } from './interface';
import type { FormContext, FormItemInfo } from './context';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'FormItem',
	components: {
		FormRow,
		FormCol,
		FormItemLabel,
		FormItemMessage,
	},
	props: {
		/**
		 * @zh 表单元素在数据对象中的path（数据项必填）
		 * @en The path of the form element in the data object (required for the data item)
		 */
		field: {
			type: String,
			default: '',
		},
		/**
		 * @zh 标签的文本
		 * @en Label text
		 */
		label: String,
		/**
		 * @zh 提示内容
		 * @en Tooltip text
		 * @version 1.0.0
		 */
		tooltip: {
			type: String,
		},
		/**
		 * @zh 是否显示冒号
		 * @en Whether to show a colon
		 */
		showColon: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 是否去除样式
		 * @en Whether to remove the style
		 */
		noStyle: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 是否禁用
		 * @en Whether to disable
		 */
		disabled: {
			type: Boolean,
			default: undefined,
		},
		/**
		 * @zh 帮助文案
		 * @en Help copywriting
		 */
		help: String,
		/**
		 * @zh 额外显示的文案
		 * @en Additional display copy
		 */
		extra: String,
		/**
		 * @zh 是否必须填写
		 * @en Is it required
		 */
		required: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 可选择将星号置于 label 前/后
		 * @en Optionally place an asterisk before/after the label
		 * @values 'start', 'end'
		 * @version 1.0.0
		 */
		asteriskPosition: {
			type: String,
			default: 'start',
		},
		/**
		 * @zh 表单项校验规则（优先级高于 form 的 rules）
		 * @en Form item validation rules (The priority is higher than the rules of form)
		 */
		rules: {
			type: [Object, Array] as PropType<FieldRule | FieldRule[]>,
		},
		/**
		 * @zh 校验状态
		 * @en Validate status
		 * @values 'success', 'warning', 'error', 'validating'
		 */
		validateStatus: {
			type: String as PropType<ValidateStatus>,
		},
		/**
		 * @zh 触发校验的事件
		 * @en The event that triggers the verification
		 * @values 'change', 'input', 'focus', 'blur'
		 */
		validateTrigger: {
			type: [String, Array] as PropType<ValidateTrigger | ValidateTrigger[]>,
			default: 'change',
		},
		/**
		 * @zh 标签元素布局选项。参数同 `<col>` 组件一致
		 * @en Label element layout options. The parameters are the same as the `<col>` component
		 */
		labelColProps: Object,
		/**
		 * @zh 表单控件布局选项。参数同 `<col>` 组件一致
		 * @en Form control layout options. The parameters are the same as the `<col>` component
		 */
		wrapperColProps: Object,
		/**
		 * @zh 是否隐藏标签
		 * @en Whether to hide the label
		 */
		hideLabel: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 是否隐藏星号
		 * @en Whether to hide the asterisk
		 */
		hideAsterisk: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 标签元素布局组件的 style
		 * @en The style of the label element layout component
		 * @version 1.0.0
		 */
		labelColStyle: Object,
		/**
		 * @zh 表单控件布局组件的 style
		 * @en The style of the form control layout component
		 * @version 1.0.0
		 */
		wrapperColStyle: Object,
		/**
		 * @zh 表单项布局选项。参数同 `<row>` 组件一致
		 * @en Form item layout options. The parameters are the same as the `<row>` component
		 * @version 1.0.0
		 */
		rowProps: Object,
		/**
		 * @zh 表单项布局组件的 class
		 * @en The class of the form item layout component
		 * @version 1.0.0
		 */
		rowClass: [String, Array, Object],
		/**
		 * @zh 表单控件包裹层的 class
		 * @en The class of the form control wrapping layer
		 * @version 1.0.0
		 */
		contentClass: [String, Array, Object],
		/**
		 * @zh 内容层是否开启 flex 布局
		 * @en Whether to enable flex layout in the content layer
		 * @version 1.0.0
		 */
		contentFlex: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh 设置标签 `Col` 组件的 flex 属性。设置时表单 `Col` 组件的 flex 属性会被设置为 `auto`。
		 * @en Set the flex property of the label `Col` component. When set, the flex property of the form `Col` component will be set to `auto`.
		 * @version 1.0.0
		 */
		labelColFlex: {
			type: [Number, String],
		},
		/**
		 * @zh 是否显示表单控件的反馈图标
		 * @en Whether to show the feedback icon for the form control
		 * @version 1.0.0
		 */
		feedback: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 表单项标签渲染的元素
		 * @en The element that the form item label renders
		 * @version 1.0.0
		 */
		labelComponent: {
			type: String,
			default: 'label',
		},
		/**
		 * @zh 表单项元素的属性
		 * @en Attributes of the form item element
		 * @version 1.0.0
		 */
		labelAttrs: Object,
	},
	/**
	 * @zh 标签
	 * @en Label
	 * @slot label
	 */
	/**
	 * @zh 帮助信息
	 * @en Help message
	 * @slot help
	 */
	/**
	 * @zh 额外内容
	 * @en Extra content
	 * @slot extra
	 */
	/**
	 * @zh 前缀元素
	 * @en Prefix
	 * @slot prefix
	 */
	/**
	 * @zh 后缀元素
	 * @en Suffix
	 * @slot suffix
	 */
	setup(props) {
		const prefixCls = getPrefixCls('form-item');
		const { field } = toRefs(props);
		const formCtx = inject<Partial<FormContext>>(formInjectionKey, {});
		const { autoLabelWidth, layout } = toRefs(formCtx);
		const { i18nMessage } = useI18n();

		const mergedLabelCol = computed(() => {
			const colProps = { ...(props.labelColProps ?? formCtx.labelColProps) };
			if (props.labelColFlex) {
				colProps.flex = props.labelColFlex;
			} else if (formCtx.autoLabelWidth) {
				colProps.flex = `${formCtx.maxLabelWidth}px`;
			}
			return colProps;
		});

		const fieldId = computed(() => {
			if (field.value) {
				return getFormElementId(formCtx.id, field.value);
			} else {
				return '';
			}
		});

		const mergedWrapperCol = computed(() => {
			const colProps = {
				...(props.wrapperColProps ?? formCtx.wrapperColProps),
			};
			// if (field.value) {
			// 	colProps.id = getFormElementId(formCtx.id, field.value);
			// }
			if (props.labelColFlex || formCtx.autoLabelWidth) {
				colProps.flex = 'auto';
			}
			return colProps;
		});

		const mergedLabelStyle = computed(() => props.labelColStyle ?? formCtx.labelColStyle);
		const mergedWrapperStyle = computed(() => props.wrapperColStyle ?? formCtx.wrapperColStyle);

		// 记录初始值，用于重置表单
		const initialValue = getValueByPath(formCtx.model, props.field);

		const validateStatus = reactive<Record<string, ValidateStatus | ''>>({});
		const validateMessage = reactive<Record<string, string>>({});
		const finalStatus = computed(() => getFinalValidateStatus(validateStatus));
		const finalMessage = computed(() => getFinalValidateMessage(validateMessage));
		// 用于重置表单时，不触发校验
		const validateDisabled = ref(false);

		const fieldValue = computed(() => getValueByPath(formCtx.model, props.field));

		const computedDisabled = computed(() => Boolean(props.disabled ?? formCtx?.disabled));
		const computedValidateStatus = computed(() => props.validateStatus ?? finalStatus.value);
		const isError = computed(() => computedValidateStatus.value === 'error');

		const mergedRules = computed(() => {
			const baseRules = ([] as FieldRule[]).concat(props.rules ?? formCtx?.rules?.[props.field] ?? []);
			const hasRequiredRule = baseRules.some(item => item.required);

			if (props.required && !hasRequiredRule) {
				return ([{ required: true }] as FieldRule[]).concat(baseRules);
			}
			return baseRules;
		});

		const isRequired = computed(() => mergedRules.value.some(item => item.required));

		const formItemCtx = props.noStyle ? inject(formItemInjectionKey, undefined) : undefined;

		const updateValidateState = (field: string, { status, message }: { status: ValidateStatus | ''; message: string }) => {
			validateStatus[field] = status;
			validateMessage[field] = message;

			if (props.noStyle) {
				formItemCtx?.updateValidateState(field, { status, message });
			}
		};

		const computedFeedback = computed(() => (props.feedback && computedValidateStatus.value ? computedValidateStatus.value : undefined));

		const validateField = (): Promise<any> => {
			if (validateDisabled.value) {
				return Promise.resolve();
			}

			const rules = mergedRules.value;
			if (!field.value || rules.length === 0) {
				if (finalStatus.value) {
					clearValidate();
				}
				return Promise.resolve();
			}

			const _field = field.value;
			const _value = fieldValue.value;
			updateValidateState(_field, {
				status: '',
				message: '',
			});

			const schema = new Schema(
				{
					[_field]: rules.map(({ ...rule }) => {
						if (!rule.type && !rule.validator) {
							rule.type = 'string';
						}
						return rule;
					}),
				},
				{
					ignoreEmptyString: true,
					validateMessages: i18nMessage.value.form?.validateMessages,
				},
			);

			return new Promise(resolve => {
				schema.validate({ [_field]: _value }, (err: Data) => {
					const isError = Boolean(err?.[_field]);
					let message: string = err?.[_field].message ?? '';
					if (props.label) {
						message = message.replace(_field, props.label);
					}
					updateValidateState(_field, {
						status: isError ? 'error' : '',
						message,
					});

					const error = isError
						? {
								label: props.label,
								field: field.value,
								value: err[_field].value,
								type: err[_field].type,
								isRequiredError: Boolean(err[_field].requiredError),
								message,
						  }
						: undefined;

					resolve(error);
				});
			});
		};

		const validateTriggers = computed(() => ([] as ValidateTrigger[]).concat(props.validateTrigger));

		const eventHandlers = computed(() =>
			validateTriggers.value.reduce((event, trigger) => {
				switch (trigger) {
					case 'change':
						event.onChange = () => {
							validateField();
						};
						return event;
					case 'input':
						event.onInput = () => {
							nextTick(() => {
								validateField();
							});
						};
						return event;
					case 'focus':
						event.onFocus = () => {
							validateField();
						};
						return event;
					case 'blur':
						event.onBlur = () => {
							validateField();
						};
						return event;
					default:
						return event;
				}
			}, {} as FormItemEventHandler),
		);

		provide(
			formItemInjectionKey,
			reactive({
				eventHandlers,
				size: formCtx && toRef(formCtx, 'size'),
				disabled: computedDisabled,
				error: isError,
				feedback: computedFeedback,
				updateValidateState,
			}),
		);

		const clearValidate = () => {
			if (field.value) {
				updateValidateState(field.value, {
					status: '',
					message: '',
				});
			}
		};

		const setField = (data: FieldData) => {
			if (field.value) {
				validateDisabled.value = true;
				if ('value' in data && formCtx?.model && field.value) {
					setValueByPath(formCtx.model, field.value, data.value);
				}

				if (data.status || data.message) {
					updateValidateState(field.value, {
						status: data.status ?? '',
						message: data.message ?? '',
					});
				}

				nextTick(() => {
					validateDisabled.value = false;
				});
			}
		};

		const resetField = () => {
			clearValidate();
			validateDisabled.value = true;
			if (formCtx?.model && field.value) {
				setValueByPath(formCtx.model, field.value, initialValue);
			}

			nextTick(() => {
				validateDisabled.value = false;
			});
		};

		const formItemInfo: FormItemInfo = reactive({
			field,
			disabled: computedDisabled,
			error: isError,
			validate: validateField,
			clearValidate,
			resetField,
			setField,
		});

		onMounted(() => {
			if (formItemInfo.field) {
				formCtx.addField?.(formItemInfo);
			}
		});

		onBeforeUnmount(() => {
			if (formItemInfo.field) {
				formCtx.removeField?.(formItemInfo);
			}
		});

		const cls = computed(() => [
			prefixCls,
			`${prefixCls}-layout-${formCtx.layout}`,
			{
				[`${prefixCls}-error`]: isError.value,
				[`${prefixCls}-status-${computedValidateStatus.value}`]: Boolean(computedValidateStatus.value),
			},
			props.rowClass,
		]);

		const labelColCls = computed(() => [
			`${prefixCls}-label-col`,
			{
				[`${prefixCls}-label-col-left`]: formCtx.labelAlign === 'left',
				[`${prefixCls}-label-col-flex`]: formCtx.autoLabelWidth || props.labelColFlex,
			},
		]);

		const wrapperColCls = computed(() => [
			`${prefixCls}-wrapper-col`,
			{
				[`${prefixCls}-wrapper-col-flex`]: !mergedWrapperCol.value,
			},
		]);

		return {
			fieldId,
			prefixCls,
			cls,
			isRequired,
			isError,
			finalMessage,
			mergedLabelCol,
			mergedWrapperCol,
			labelColCls,
			autoLabelWidth,
			layout,
			mergedLabelStyle,
			wrapperColCls,
			mergedWrapperStyle,
		};
	},
});
</script>
