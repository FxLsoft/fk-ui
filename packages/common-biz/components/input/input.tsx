import { computed, defineComponent, useTemplateRef } from 'vue';
import { isString } from 'lodash-es';
import {
	AutoComplete,
	Cascader,
	Checkbox,
	CheckboxGroup,
	DatePicker,
	INPUT_EVENTS,
	IconSearch,
	Input,
	InputNumber,
	InputPassword,
	Message,
	Modal,
	RadioGroup,
	RangePicker,
	Select,
	Switch,
	Textarea,
	TimePicker,
	TreeSelect,
	Upload,
	isArray,
	omit,
} from '@erp/common';
import { UPDATE_MODEL } from '../../utils/constants';
import SelectShopInput from '../select-shop/SelectShopInput.vue';
import RangeNumberInput from '../range-number-input/RangeNumberInput.vue';
import { GoodsCategoryInput } from '../good-category';
import { DicInput } from '../dic';
import { getToken } from '../../http';
import { RichTextInput } from '../rich-text';
import { createBatchInputPop } from '../batch-input';
import { HTMLEditor } from '../html-editor';
import { pop } from '../pop';
import { FileSuffixMap, getDateRangeShortcuts, getDateShortcuts, getFileExtension } from './options';
import { InputKeys } from './interface';
import { processAttrs } from './hooks';
import type { InputType, ModelValueType, OptionData } from './interface';
import type { FileItem } from '@erp/common';
import type { PropType, VNodeChild } from 'vue';

const InputContext: Record<InputType, (props, emit, slots, attrs) => VNodeChild> = {
	'batch-input': (props, emit, slots, attrs) => {
		const handleEnter = evt => {
			createBatchInputPop({
				bizName: attrs.name,
			}).then(value => {
				emit(UPDATE_MODEL, value);
				emit('change', value, evt);
			});
		};
		return (
			<Input
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				placeholder={props.placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				onKeydown={(evt: KeyboardEvent) => {
					if (evt.key === 'Enter') {
						evt.preventDefault();
						evt.stopPropagation();
						handleEnter(evt);
					}
				}}
				onDblclick={evt => {
					handleEnter(evt);
				}}
				{...attrs}
				v-slots={slots}
			/>
		);
	},
	'range-number': (props, emit, slots, attrs) => {
		return (
			<RangeNumberInput
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				placeholder={props.placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
				v-slots={slots}
			/>
		);
	},
	time: (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		if (props.multiple) {
			if (!placeholder) {
				placeholder = ['开始时间', '结束时间'];
			} else if (isString(placeholder)) {
				placeholder = [placeholder];
			}
		} else {
			placeholder = placeholder ?? '请选择时间';
		}
		return (
			<TimePicker
				ref="instance"
				key={`__erp__${props.type}_${props.multiple}`}
				type={props.multiple ? 'time-range' : 'time'}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				format="HH:mm"
				step={{
					minute: 5,
				}}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
				v-slots={slots}
			/>
		);
	},
	password: (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请输入';
		}
		return (
			<InputPassword
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
			/>
		);
	},
	switch: (props, emit, slots, attrs) => {
		const checked = computed(() => {
			if (Array.isArray(props.options) && props.options.length > 0) {
				return props.options[0];
			}
			return {
				label: '',
				value: true,
			};
		});
		const unChecked = computed(() => {
			if (Array.isArray(props.options) && props.options.length > 1) {
				return props.options[1];
			}
			return {
				label: '',
				value: false,
			};
		});
		return (
			<Switch
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				disabled={props.disabled}
				checkedValue={checked.value.value}
				uncheckedValue={unChecked.value.value}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
			>
				{{
					checked: () => checked.value.label,
					unchecked: () => unChecked.value.label,
				}}
			</Switch>
		);
	},
	text: (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请输入';
		}
		return (
			<Input
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
				v-slots={slots}
			/>
		);
	},
	'search-input': (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请输入';
		}
		return (
			<Input.Search
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
				v-slots={{
					buttonIcon: () => IconSearch,
					...slots,
				}}
			/>
		);
	},
	number: (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请输入';
		}
		let _Component;
		if (props.multiple) {
			_Component = RangeNumberInput;
		} else {
			_Component = InputNumber;
		}
		return (
			<_Component
				ref="instance"
				key={`__erp__${props.type}_${props.multiple}`}
				precision={2}
				min={0}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
				v-slots={slots}
			/>
		);
	},
	integer: (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请输入';
		}
		return (
			<InputNumber
				ref="instance"
				key={`__erp__${props.type}`}
				precision={0}
				min={0}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
				v-slots={slots}
			/>
		);
	},
	textarea: (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请输入';
		}
		return (
			<Textarea
				ref="instance"
				key={`__erp__${props.type}`}
				auto-size={{ minRows: 2, maxRows: 5 }}
				show-word-limit={true}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
				v-slots={slots}
			/>
		);
	},
	date: (props, emit, slots, attrs) => {
		const shortcuts = getDateShortcuts();
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请选择日期';
		}
		return (
			<DatePicker
				ref="instance"
				key={`__erp__${props.type}`}
				shortcuts-position="left"
				// @ts-ignore
				shortcuts={shortcuts}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
			/>
		);
	},
	datetime: (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		let _Component;
		if (props.multiple) {
			_Component = RangePicker;
			if (!placeholder) {
				placeholder = ['开始时间', '结束时间'];
			} else if (isString(placeholder)) {
				placeholder = [placeholder];
				// placeholder = [`${placeholder}开始日期`, `${placeholder}结束日期`];
			}
		} else {
			_Component = DatePicker;
			if (!placeholder) {
				placeholder = '请选择时间';
			}
		}
		return (
			<_Component
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				showTime={true}
				format="YYYY-MM-DD HH:mm:ss"
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
			/>
		);
	},
	rangedate: (props, emit, slots, attrs) => {
		const rangeShortcuts = getDateRangeShortcuts();
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = ['开始日期', '结束日期'];
		} else if (isString(placeholder)) {
			placeholder = [placeholder];
			// placeholder = [`${placeholder}开始日期`, `${placeholder}结束日期`];
		}
		return (
			<RangePicker
				ref="instance"
				key={`__erp__${props.type}`}
				shortcuts-position="left"
				shortcuts={rangeShortcuts}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					if (!Array.isArray(value)) {
						value = [];
					}
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
			/>
		);
	},
	autocomplete: (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请输入';
		}
		return (
			<AutoComplete
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				// @ts-ignore
				placeholder={placeholder}
				allowClear={props.allowClear}
				multiple={props.multiple}
				disabled={props.disabled}
				data={props.options}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
			/>
		);
	},
	checkbox: (props, emit, slots, attrs) => {
		return (
			<CheckboxGroup
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				disabled={props.disabled}
				options={props.options}
				multiple={props.multiple}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
			/>
		);
	},
	radio: (props, emit, slots, attrs) => {
		return (
			<RadioGroup
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				disabled={props.disabled}
				options={props.options}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
			/>
		);
	},
	select: (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请选择';
		}
		const allCheckbox = computed(() => {
			const values: any[] = props.modelValue || [];
			const options = validateOptions.value;
			if (isArray(options)) {
				const checked = options.every(v => values.includes(v.value));
				return {
					checked,
					indeterminate: !checked && options.some(v => values.includes(v.value)),
				};
			} else {
				return {
					checked: false,
					indeterminate: false,
				};
			}
		});

		const validateOptions = computed(() => {
			const options: OptionData[] = props.options;
			return options.filter(v => !v.disabled);
		});

		const handleCheckAll = (evt: Event) => {
			const options: OptionData[] = validateOptions.value;
			const values: any[] = props.modelValue || [];
			const isCheckedAll = allCheckbox.value.checked;
			if (isCheckedAll) {
				options.forEach(opt => {
					const index = values.indexOf(opt.value);
					if (index > -1) {
						values.splice(index, 1);
					}
				});
				emit(UPDATE_MODEL, values);
				emit('change', values, evt);
			} else {
				options.forEach(opt => {
					const index = values.indexOf(opt.value);
					if (index === -1) {
						values.push(opt.value);
					}
				});
				emit(UPDATE_MODEL, values);
				emit('change', values, evt);
			}
		};

		/**
		 * 是否显示 全部按钮
		 */
		const isShowAll = computed(() => {
			const attr = processAttrs(attrs);
			return props.multiple && (attr.checkAll || attr.checkAll === '');
		});

		return (
			<Select
				ref="instance"
				key={`__erp__${props.type}`}
				tagNowrap={true}
				allowSearch={true}
				unmountOnClose={true}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				multiple={props.multiple}
				disabled={props.disabled}
				options={props.options}
				scrollbar={true}
				virtualListProps={{
					height: 200,
				}}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				// @ts-ignore
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
			>
				{{
					header: isShowAll.value
						? () => (
								<div class="fk-select-option fk-select-option-multiple">
									<Checkbox
										style="width: 100%;"
										modelValue={allCheckbox.value.checked}
										indeterminate={allCheckbox.value.indeterminate}
										label="全选"
										onClick={evt => handleCheckAll(evt)}
									/>
								</div>
						  )
						: null,
				}}
			</Select>
		);
	},
	cascader: (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请选择';
		}
		return (
			<Cascader
				ref="instance"
				key={`__erp__${props.type}`}
				tagNowrap={true}
				allowSearch={true}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				multiple={props.multiple}
				disabled={props.disabled}
				options={props.options}
				scrollbar={true}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				// @ts-ignore
				onChange={(val, evt) => {
					emit('change', val, evt);
				}}
				{...attrs}
			/>
		);
	},
	tree: (props, emit, slots, attrs) => {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请选择';
		}
		let treeCheckable = false;
		if (props.multiple) {
			treeCheckable = true;
		}
		return (
			<TreeSelect
				ref="instance"
				key={`__erp__${props.type}__${props.multiple}`}
				tagNowrap={true}
				allowSearch={true}
				treeCheckable={treeCheckable}
				fieldNames={{
					key: 'value',
					title: 'label',
					filterKey: 'label',
					children: 'children',
				}}
				treeProps={{
					defaultExpandAll: false,
					virtualListProps: {
						height: 200,
					},
				}}
				modelValue={props.modelValue}
				placeholder={placeholder}
				allowClear={props.allowClear}
				multiple={props.multiple}
				disabled={props.disabled}
				data={props.options}
				scrollbar={true}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val: any, evt?) => {
					emit('change', val, evt);
				}}
				{...attrs}
			/>
		);
	},
	upload: (props, emit, slots, attrs) => {
		let limit = attrs.limit ?? 0;
		if (!props.multiple) {
			limit = 1;
		}

		const placeholder = computed(() => {
			return props.placeholder ?? `支持${accepts.value.join('、')}等${acceptType.value.join('、')}文件格式，单个文件不超过${maxSize.value}MB`;
		});

		const acceptType = computed(() => {
			let values: string[] = [];
			if (Array.isArray(props.accept)) {
				values = props.accept;
			} else if (props.accept) {
				values = props.accept.split(/,，\s*/);
			} else {
				values = ['图片'];
			}
			return values;
		});

		const accepts = computed(() => {
			return FileSuffixMap.filter(v => acceptType.value.includes(v.label) || acceptType.value.includes(v.key)).flatMap(v => v.accept);
		});

		const accept = computed(() => {
			return accepts.value.map(v => `.${v}`).join(',');
		});

		const maxSize = computed(() => {
			return (
				attrs.maxSize ??
				(FileSuffixMap.filter(v => acceptType.value.includes(v.label) || acceptType.value.includes(v.key)).find(v => v.maxSize)?.maxSize || 5)
			);
		});

		const beforeUpload = async (file: File): Promise<boolean> => {
			const suffix = getFileExtension(file.name);
			if (!accepts.value.includes(suffix)) {
				Message.error('文件类型不符合要求');
				return false;
			} else if (file.size / 1024 / 1024 > maxSize.value) {
				Message.error(`${acceptType.value.join('，')}不能超过${maxSize.value}M`);
				return false;
			}
			return true;
			// return new Promise((resolve, reject) => {
			// 	Modal.confirm({
			// 		title: '温馨提示',
			// 		content: `确认上传 ${file.name}`,
			// 		closable: true,
			// 		onOk: () => resolve(true),
			// 		onCancel: () => reject(false),
			// 	});
			// });
		};

		/**
		 * 删除之前
		 * @param file
		 * @returns
		 */
		const beforeRemove = (file: FileItem): Promise<boolean> => {
			return new Promise((resolve, reject) => {
				Modal.confirm({
					title: '温馨提示',
					content: `确定要删除 ${file.name || '该文件/图片'} 吗？`,
					closable: true,
					onOk: () => resolve(true),
					onCancel: () => reject(false),
				});
			});
		};

		const afterUpload = (file: FileItem) => {
			const res = file.response || {};
			if (res.code !== 200) {
				file.status = 'error';
				const errMsg = res.msg ?? '上传失败';
				pop.error(errMsg);
				throw new Error(errMsg);
			}
			const data = res?.data;
			if (data) {
				file.url = data.path;
				file.id = data.id;
			}
		};

		const fileList = computed(() => {
			if (Array.isArray(props.modelValue)) {
				return props.modelValue;
			} else if (props.modelValue) {
				return [props.modelValue];
			} else {
				return [];
			}
		});

		return (
			<Upload
				ref="instance"
				key={`__erp__${props.type}__${props.multiple}`}
				buttonText="点击选择文件"
				draggable={true}
				image-preview={true}
				list-type="picture-card"
				name="files"
				action="/api/system/upload"
				limit={limit}
				accept={accept.value}
				fileList={fileList.value}
				tip={placeholder.value}
				showRemoveButton={props.allowClear}
				multiple={props.multiple}
				disabled={props.disabled}
				data={props.options}
				headers={{
					get Authorization() {
						return `Bearer ${getToken()}`;
					},
				}}
				onUpdate:fileList={value => {
					if (props.multiple) {
						emit(UPDATE_MODEL, value);
					} else {
						if (value.length > 0) {
							emit(UPDATE_MODEL, value[0]);
						} else {
							emit(UPDATE_MODEL, null);
						}
					}
				}}
				onChange={(val: any, evt?) => {
					emit('change', val, evt);
				}}
				onBeforeUpload={beforeUpload}
				onBeforeRemove={beforeRemove}
				onAfterUpload={afterUpload}
				{...attrs}
			>
				{slots}
			</Upload>
		);
	},
	'select-shop': function (props: any, emit: any, slots: any, attrs: any): VNodeChild {
		return (
			<SelectShopInput
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				allowClear={props.allowClear}
				disabled={props.disabled}
				placeholder={props.placeholder}
				multiple={props.multiple}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				{...attrs}
			></SelectShopInput>
		);
	},
	'goods-category': function (props: any, emit: any, slots: any, attrs: any): VNodeChild {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请选择';
		}
		return (
			<GoodsCategoryInput
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				allowClear={props.allowClear}
				disabled={props.disabled}
				placeholder={placeholder}
				multiple={props.multiple}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val: any, evt?) => {
					emit('change', val, evt);
				}}
			></GoodsCategoryInput>
		);
	},
	dic(props: any, emit: any, slots: any, attrs: any): VNodeChild {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请选择';
		}
		return (
			<DicInput
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				allowClear={props.allowClear}
				disabled={props.disabled}
				placeholder={placeholder}
				multiple={props.multiple}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				onChange={(val: any, evt?) => {
					emit('change', val, evt);
				}}
				{...attrs}
			></DicInput>
		);
	},
	'rich-text': function (props: any, emit: any, slots: any, attrs: any): VNodeChild {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请输入';
		}
		return (
			<RichTextInput
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				{...attrs}
			></RichTextInput>
		);
	},
	'html-input': function (props: any, emit: any, slots: any, attrs: any): VNodeChild {
		let placeholder = props.placeholder;
		if (!placeholder) {
			placeholder = '请输入';
		}
		return (
			<HTMLEditor
				ref="instance"
				key={`__erp__${props.type}`}
				modelValue={props.modelValue}
				disabled={props.disabled}
				onUpdate:modelValue={value => {
					emit(UPDATE_MODEL, value);
				}}
				{...attrs}
			></HTMLEditor>
		);
	},
};

const CompositeInput = defineComponent({
	name: 'Input',
	inheritAttrs: false,
	props: {
		/**
		 * @zh 绑定值
		 */
		modelValue: {
			type: [String, Number, Boolean, Array, Object] as PropType<ModelValueType>,
			default: '',
		},

		/**
		 * @zh 输入类型
		 */
		type: {
			type: String as PropType<InputType>,
			default: 'text',
			required: true,
		},
		/**
		 * @zh 是否允许清空输入框
		 */
		allowClear: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh 是否禁用
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
			default: false,
		},
		/**
		 * @zh 提示文字
		 */
		placeholder: {
			type: [String, Array] as PropType<string | string[]>,
		},
		/**
		 * @zh 配置
		 */
		options: {
			type: Array as PropType<(string | number | OptionData)[] | Promise<(string | number | OptionData)[]>>,
			default: () => [],
		},
		/**
		 * @zh 上传文件限制
		 * 图片, Excel, Word, PPT, PDF, 视频, 音频
		 * @default 图片
		 */
		accept: {
			type: [String, Array] as PropType<string[] | string>,
		},
	},
	emits: {
		'update:modelValue': (value: ModelValueType) => true,
		/**
		 * @zh 仅在输入框失焦或按下回车时触发
		 * @param {ModelValueType} value
		 * @param {Event} ev
		 */
		change: (value: ModelValueType, ev?: Event) => true,
	},
	setup(props, { emit, slots, attrs }) {
		let bizType = props.type;
		if (bizType == 'date' && props.multiple) {
			bizType = 'rangedate';
		}
		if (!InputKeys.includes(bizType)) {
			console.error('ErrInput >>', bizType);
		}

		const instance = useTemplateRef<any>('instance');

		const inputAttrs = omit(attrs, ['onUpdate:modelValue', 'onChange', 'onClick'].concat(INPUT_EVENTS));
		const render = () => {
			return (
				<div class="erp-input" {...inputAttrs}>
					{InputContext[bizType](props, emit, slots, attrs)}
				</div>
			);
		};
		return {
			instance,
			render,
		};
	},
	methods: {
		/**
		 * @zh 获取输入框实例
		 */
		getInstance() {
			return this.instance;
		},
		/**
		 * @zh 聚焦事件
		 */
		focus() {
			this.instance?.focus();
		},
		/**
		 * @zh 失焦事件
		 */
		blur() {
			this.instance?.blur();
		},
	},
	render() {
		return this.render();
	},
});

export default CompositeInput;

export * from './interface';
