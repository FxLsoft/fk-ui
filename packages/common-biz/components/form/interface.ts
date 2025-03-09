import type { Component, Slot, VNode } from 'vue';
import type { InputType, OptionData } from '../input/input';
import type { ButtonProps, FieldRule, FormInstance, RowProps, ValidatedError, ValidateStatus, ValidateTrigger } from '@erp/common';
/**
 * 动态表单按钮类型
 */
export interface FormButtonType extends ButtonProps {
	/**
	 * 按钮唯一标识
	 */
	code: string;

	/**
	 * 校验配置 true 为 自动校验
	 * field 一个一个的字段校验
	 */
	validator?: boolean | 'field' | ((model: Record<string, any>, form: FormInstance) => Promise<Record<string, ValidatedError> | undefined>);
}

export interface DynamicFormI {
	/**
	 * 表单ID
	 */
	$id?: string;
	/**
	 * 表单标题
	 */
	title?: string;
	/**
	 * 表单字段
	 */
	fields?: DynamicFormFieldI[];
	/**
	 * 表单组
	 */
	groups?: DynamicFormGroupI[];
	/**
	 * 是否显示左侧导航
	 * 默认显示
	 */
	showSide?: boolean;
	/**
	 * 显示button
	 */
	buttons?: FormButtonType[];
	/**
	 * 表单字段布局
	 */
	layout?: 'horizontal' | 'vertical' | 'inline';

	/**
	 * label方向
	 * @private
	 */
	labelAlign?: 'left' | 'right';
	/**
	 * 每一行展示的列数
	 */
	cols?: number;
	/**
	 * 列与列之间的间距
	 */
	colGap?: number;
	/**
	 * 动态组件
	 * 只能第一次注册
	 */
	components?: Record<string, Component>;
}

/**
 * 表单group配置
 */
export interface DynamicFormGroupI {
	/**
	 * 由框架自己生成
	 */
	$id?: string; //
	/**
	 * 表单域标签
	 */
	label?: string;
	/**
	 * 表单字段
	 */
	fields: DynamicFormFieldI[];
	/**
	 * 每一行展示的列数
	 */
	cols?: number;
	/**
	 * 列与列之间的间距
	 */
	colGap?: number;
	/**
	 * 显示button
	 */
	buttons?: FormButtonType[];
	/**
	 * 提示信息
	 */
	tip?: string;
}

/**
 * 表单字段配置
 */
export interface DynamicFormFieldI {
	/**
	 * id 自动生成
	 */
	$id?: string;
	/**
	 * 数据模式key，符合propertyKey
	 */
	key: string;
	/**
	 * 组件类型
	 */
	type: InputType | 'custom';
	/**
	 * 组件
	 */
	component?: Component | string;
	/**
	 * 组件额外配置
	 * 除了 `DynamicFormFieldI` 自带的属性外，如果组件特有的属性外都在此配置
	 */
	componentProps?: any;
	/**
	 * 标签的文本
	 */
	label?: string;
	/**
	 * 是否多值
	 */
	multiple?: boolean;
	/**
	 *	是否禁用
	 */
	disabled?: boolean;
	/**
	 * 占位
	 */
	placeholder?: string;
	/**
	 * 组件数据配置
	 */
	options?: OptionData[] | (() => Promise<OptionData[]>);
	/**
	 * 提示内容
	 */
	tooltip?: string;
	/**
	 * 是否显示冒号
	 */
	showColon?: boolean;
	/**
	 * 是否去除样式
	 */
	noStyle?: boolean;
	/**
	 * 帮助文案
	 */
	help?: string;
	/**
	 * 是否必须填写
	 */
	required?: boolean;
	/**
	 * 表单项校验规则
	 */
	rules?: FieldRule | FieldRule[];
	/**
	 *	校验状态
	 */
	validateStatus?: ValidateStatus;
	/**
	 * 触发校验的事件
	 */
	validateTrigger?: ValidateTrigger;
	/**
	 * 是否隐藏标签
	 */
	hideLabel?: boolean;
	/**
	 * 是否隐藏星号
	 */
	hideAsterisk?: boolean;
	/**
	 * 是否显示表单控件的反馈图标
	 */
	feedback?: boolean;
	/**
	 * 表单项布局选项
	 */
	row?: RowProps;
	/**
	 * 跨越的格数
	 */
	span?: number;

	/**
	 * class
	 */
	class?: string;

	/**
	 * 是否显示
	 */
	show?: boolean | (() => boolean);

	/**
	 * FormItem slots配置
	 */
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
	slots?: Record<string, () => any>;
}

/**
 * 子组件Props
 */
export interface DynamicFieldComponentProps {
	/**
	 * 子组件的表单域配置
	 */
	field: DynamicFormFieldI;
	/**
	 * 表单数据模型
	 */
	model: Record<string, any>;
	/**
	 * 对应表单的值
	 */
	modelValue: any;

	extra: string;
}

/**
 * 子组件Expose
 */
export interface DynamicFieldComponentExpose {
	/**
	 * 校验 true 通过 false 未通过
	 * @returns
	 */
	validate: () => boolean | string | Promise<boolean | string>;
}
