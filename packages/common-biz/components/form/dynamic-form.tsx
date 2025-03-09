import { defineComponent, inject, onBeforeUnmount, onMounted, provide, ref, useTemplateRef, watchEffect } from 'vue';
import { get, set } from 'xe-utils';
import { isEmpty, isNumber } from 'lodash-es';
import { Button, Form, FormItem, Grid, GridItem, isObject, isPromise, isString, throttleByRaf } from '@erp/common';
import Input from '../input';
import { useOptionDataHook } from '../input/hooks';
import { formatDynamicForm } from './context';
import type { FormFieldI } from '../search-form';
import type { DynamicFieldComponentExpose, DynamicFormFieldI, DynamicFormGroupI, DynamicFormI, FormButtonType } from './interface';
import type { Component, InjectionKey, PropType, ShallowRef } from 'vue';
import type { FormInstance, ValidatedError } from '@erp/common';

const DynamicFormContext: InjectionKey<DynamicFormContextI> = Symbol('DynamicFormContext');

interface DynamicFormContextI {
	components: Record<string, Component>;
	slots: any;
	addComp: (field: FormFieldI, comp: Readonly<ShallowRef<DynamicFieldComponentExpose>>) => void;
	removeComp: (field: FormFieldI) => void;
}

const _FieldComponent = defineComponent({
	name: 'DynamicFormField',
	props: {
		field: Object as PropType<DynamicFormFieldI>,
		modelValue: Object as PropType<Record<string, any>>,
	},
	setup(props, { emit, slots, attrs }) {
		const { options, loading } = useOptionDataHook(props.field);
		const context = inject(DynamicFormContext);
		const compRef = useTemplateRef<DynamicFieldComponentExpose>('comp');
		const renderComponent = (field: DynamicFormFieldI) => {
			console.log('renderComponent >>', field);

			if (field.type === 'custom') {
				let comp: Component;
				if (isObject(field.component)) {
					comp = field.component;
				} else if (isString(field.component)) {
					comp = context.components[field.component] || context.slots[field.component];
				}
				if (!comp) {
					console.warn(`${field.key} 对应的自定义组件不存在`);
					return null;
				}
				return (
					<comp
						key={`Component_${field.$id}_${field.type}`}
						ref="comp"
						field={field}
						model={props.modelValue}
						modelValue={get(props.modelValue, field.key)}
						options={options.value}
						loading={loading.value}
						onUpdate:modelValue={value => set(props.modelValue, field.key, value)}
					></comp>
				);
			} else {
				return (
					<Input
						key={`Input_${field.$id}_${field.type}`}
						modelValue={get(props.modelValue, field.key)}
						type={field.type}
						multiple={field.multiple}
						disabled={field.disabled}
						placeholder={field.placeholder}
						options={options.value}
						loading={loading.value}
						onUpdate:modelValue={value => set(props.modelValue, field.key, value)}
						{...field.componentProps}
					/>
				);
			}
		};
		const renderField = (field: DynamicFormFieldI) => {
			return (
				<FormItem
					id={field.$id}
					key={field.$id}
					field={field.key}
					label={field.label}
					tooltip={field.tooltip}
					showColon={field.showColon}
					noStyle={field.noStyle}
					help={field.help}
					required={field.required}
					rules={field.rules}
					validateStatus={field.validateStatus}
					validateTrigger={field.validateTrigger}
					hideLabel={field.hideLabel}
					hideAsterisk={field.hideAsterisk}
					feedback={field.feedback}
					rowProps={field.row}
					class={field.class}
					v-slots={field.slots}
				>
					{renderComponent(field)}
				</FormItem>
			);
		};
		const render = () => {
			return renderField(props.field);
		};

		watchEffect(() => {
			if (compRef.value) {
				context.addComp(props.field, compRef);
			} else {
				context.removeComp(props.field);
			}
		});
		onBeforeUnmount(() => {
			context.removeComp(props.field);
		});
		return {
			render,
		};
	},

	render() {
		return this.render();
	},
});

const _Component = defineComponent({
	name: 'DynamicForm',
	props: {
		/**
		 * @zh 绑定值
		 */
		modelValue: {
			type: Object as PropType<Record<string, any>>,
			default() {
				return {};
			},
		},

		/**
		 * @zh DynamicFormI 动态表单配置
		 */
		config: {
			type: Object as PropType<DynamicFormI>,
			required: true,
		},
	},
	emits: {
		/**
		 * @zh 表单数据模型
		 */
		'update:modelValue': (value: Record<string, any>) => true,
		/**
		 * @zh 表单ok事件，可配合 createPage createModal createDrawer使用
		 * @param params
		 * @returns
		 */
		ok: (params?: any) => true,
		/**
		 * @zh 表单close事件，可配合 createPage createModal createDrawer使用
		 * @param params
		 * @returns
		 */
		close: (params?: any) => true,
		/**
		 * @zh 表单 loading 事件，可配合 createModal createDrawer使用
		 * @param params
		 * @returns
		 */
		loading: (loading?: boolean) => true,
		/**
		 * @zh 表单里配置的按钮事件
		 * @param button
		 * @returns
		 */
		click: (button: FormButtonType, errors: Record<string, ValidatedError | FormFieldI>) => true,
	},
	setup(props, { emit, slots, attrs }) {
		const formInstance = ref<FormInstance>();
		const root = ref<HTMLElement>();
		const components: Record<string, Component> = (props.config as DynamicFormI)?.components || {};
		const dynamicForm = formatDynamicForm(props.config);
		const currentGroupIndex = ref(0);
		const compMap: Map<FormFieldI, Readonly<ShallowRef<DynamicFieldComponentExpose>>> = new Map();

		provide(DynamicFormContext, {
			components,
			slots,
			addComp(field, comp) {
				compMap.set(field, comp);
			},
			removeComp(comp) {
				compMap.delete(comp);
			},
		});

		let scrollTimeoutId: number;

		const handleSideClick = (group: DynamicFormGroupI, index: number) => {
			const el = root.value.querySelector(`#${group.$id}`);
			/**
			 * scrollToElement 竟然没有滚动完回调？
			 */
			formInstance.value?.scrollToElement(el, {
				block: 'start',
				scrollMode: 'always',
				boundary: root.value,
			});
			currentGroupIndex.value = index;
			if (scrollTimeoutId) clearTimeout(scrollTimeoutId);
			scrollTimeoutId = setTimeout(() => {
				scrollTimeoutId = 0;
			}, 1000);
		};

		/**
		 * 按钮点击事件
		 * @param evt
		 * @param button
		 */
		const handleButtonClick = async (evt: MouseEvent, button: FormButtonType) => {
			let errors: Record<string, ValidatedError | FormFieldI> = {};
			const fields = getAllViewFields();
			if (button.validator === true) {
				errors = await formInstance.value.validate();
				for (const [field, comp] of compMap) {
					if (comp.value?.validate) {
						let valid = comp.value?.validate();
						if (isPromise(valid)) {
							valid = await valid;
						}
						if (!valid) {
							errors[field.key] = field;
						}
					}
				}
			} else if (button.validator === 'field') {
				for (const field of fields) {
					// 是否是自定义组件
					if (compMap.has(field)) {
						const comp = compMap.get(field);
						if (comp?.value?.validate) {
							let valid = comp.value?.validate();
							if (isPromise(valid)) {
								valid = await valid;
							}
							if (!valid) {
								errors[field.key] = field;
								break;
							}
						}
					}
					errors = await formInstance.value.validateField(field.key);
					if (errors) {
						break;
					}
				}
			} else if (isPromise(button.validator)) {
				errors = await (button.validator as any)(props.modelValue, formInstance.value);
			}
			errors = isEmpty(errors) ? null : errors;
			if (errors) {
				// 错误处理
				const fieldKey = Object.keys(errors)[0];
				const field = fields.find(item => item.key === fieldKey);
				if (field) {
					formInstance.value.scrollToElement(document.getElementById(field.$id), {
						behavior: 'smooth',
						block: 'nearest',
						scrollMode: 'always',
						inline: 'center',
					});
				}
			}
			emit('click', button, errors);
		};

		const handleRootScroll = throttleByRaf((evt: UIEvent) => {
			if (scrollTimeoutId) return;
			updateSideStyle();
		});

		const updateSideStyle = () => {
			const el = formInstance.value.$el as HTMLElement;
			const groupEls = el.querySelectorAll<HTMLElement>('.form-group');
			const exceedFactor = 0.6;
			for (let i = 0; i < groupEls.length; i++) {
				const groupEl = groupEls[i];
				let topStart = groupEl.offsetTop - el.offsetTop;
				const topEnd = groupEl.offsetHeight * exceedFactor + topStart;
				topStart = topStart - el.offsetHeight * exceedFactor;
				if (el.scrollTop >= topStart && el.scrollTop < topEnd) {
					currentGroupIndex.value = i;
					break;
				}
			}
		};

		onMounted(() => {
			updateSideStyle();
		});

		const formatSideLabel = (gruop: DynamicFormGroupI) => {
			const requiredFields = gruop.fields.filter(field => field.required);
			if (requiredFields.length) {
				const finishFields = requiredFields.filter(field => {
					const value = get(props.modelValue, field.key);
					if (isNumber(value)) {
						return !Number.isNaN(value);
					}
					return !isEmpty(value);
				});
				if (finishFields.length === requiredFields.length) {
					return '已完成';
				} else {
					return `${requiredFields.length - finishFields.length}必填项未填`;
				}
			} else {
				return `0个必填项`;
			}
		};

		const renderSide = () => {
			return (
				<ul class="form-side" key="form-side">
					{dynamicForm.groups?.map((group, index) => {
						return (
							<li class={{ active: currentGroupIndex.value == index }} onClick={() => handleSideClick(group, index)}>
								<span class="form-side-label">{group.label}</span>
								<span class="form-side-suffix">{formatSideLabel(group)}</span>
							</li>
						);
					})}
				</ul>
			);
		};

		const renderGroup = (group: DynamicFormGroupI) => {
			const viewFields = (group.fields || []).filter(v => {
				if (typeof v.show === 'function') {
					return v.show();
				} else if (typeof v.show === 'boolean') {
					return v.show;
				} else {
					return true;
				}
			});
			return (
				<div class="form-group" key={group.$id} id={group.$id}>
					{(group.label || group.buttons) && (
						<div class="form-group-header">
							{group.label && <span class="form-group-label">{group.label}</span>}
							{group.buttons && <div class="form-group-expand">{renderButtons(group.buttons)}</div>}
							{group.tip && <div class="form-group-tip">{group.tip}</div>}
						</div>
					)}
					<Grid class="form-group-wrap" cols={group.cols} colGap={group.colGap}>
						{viewFields.map(field => {
							return (
								<GridItem span={field.span} key={field.$id}>
									{{
										default: () => <_FieldComponent field={field} modelValue={props.modelValue}></_FieldComponent>,
									}}
								</GridItem>
							);
						})}
					</Grid>
				</div>
			);
		};

		const getViewFields = (fields: DynamicFormFieldI[]) => {
			const viewFields = fields.filter(v => {
				if (typeof v.show === 'function') {
					return v.show();
				} else if (typeof v.show === 'boolean') {
					return v.show;
				} else {
					return true;
				}
			});
			return viewFields;
		};

		const getAllViewFields = () => {
			let fields: DynamicFormFieldI[] = [];
			if (props.config.fields) {
				fields = fields.concat(props.config.fields);
			}
			if (props.config.groups) {
				props.config.groups.forEach(v => {
					fields = fields.concat(v.fields);
				});
			}
			return fields;
		};

		const renderFields = (fields: DynamicFormFieldI[]) => {
			const viewFields = getViewFields(fields);
			return (
				<Grid class="form-fields-group" cols={dynamicForm.cols} colGap={dynamicForm.colGap}>
					{viewFields.map(field => {
						return (
							<GridItem span={field.span} key={field.$id}>
								{{
									default: () => <_FieldComponent field={field} modelValue={props.modelValue}></_FieldComponent>,
								}}
							</GridItem>
						);
					})}
				</Grid>
			);
		};

		const renderForm = () => {
			return (
				<Form
					id={`df_${dynamicForm.$id}`}
					ref={formInstance}
					class="form-container"
					model={props.modelValue}
					layout={dynamicForm.layout}
					labelAlign={dynamicForm.labelAlign}
					// @ts-ignore
					onScroll={handleRootScroll}
				>
					{dynamicForm.fields?.length > 0 ? renderFields(dynamicForm.fields) : null}
					{dynamicForm.groups?.map(group => {
						return renderGroup(group);
					})}
				</Form>
			);
		};

		const renderButtons = (buttons: FormButtonType[]) => {
			if (!Array.isArray(buttons)) {
				return [];
			}
			return buttons.map(button => {
				return (
					<Button
						type={button.type}
						shape={button.shape}
						status={button.status}
						size={button.size}
						long={button.long}
						loading={button.loading}
						disabled={button.disabled}
						htmlType={button.htmlType}
						href={button.href}
						label={button.label}
						icon={button.icon}
						onClick={(evt: MouseEvent) => handleButtonClick(evt, button)}
					></Button>
				);
			});
		};

		const render = () => {
			console.log('dynamic-form render');
			return (
				<div ref={root} class={['dynamic-form', { 'has-side': dynamicForm.showSide }]}>
					<div class="form-body">
						{dynamicForm.showSide && renderSide()}
						{renderForm()}
					</div>
					{dynamicForm.buttons && <div class="form-footer"> {renderButtons(dynamicForm.buttons)} </div>}
				</div>
			);
		};

		return {
			render,
			formInstance,
		};
	},

	methods: {
		/**
		 * 给其他组件调用
		 * @returns
		 */
		async getModel() {
			const errors = await this.formInstance.validate();
			if (!errors) {
				return this.modelValue;
			}
			/**
			 * 校验失败
			 */
			return false;
		},

		/**
		 * 表单校验
		 */
		validate() {
			return this.formInstance.validate();
		},

		/**
		 * 获取内部Form实例
		 * @returns
		 */
		getInstance(): FormInstance {
			return this.formInstance;
		},
	},

	render() {
		return this.render();
	},
});

export default _Component;
