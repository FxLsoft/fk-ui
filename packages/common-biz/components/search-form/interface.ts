import type { GridProps, ResponsiveValue } from '@erp/common';
import type { Component, InjectionKey, Slots, VNode } from 'vue';
import type { InputType, OptionData } from '../input/interface';

/**
 * Search Form 配置
 */
export interface SearchFormI {
	/**
	 * 表单字段
	 */
	fields: FormFieldI[];

	/**
	 * 动态组件
	 */
	components?: Record<string, Component>;

	/**
	 * grid 布局配置，可响应式布局
	 */
	gridProps?: GridProps;

	/**
	 * 查询池
	 * 唯一标识
	 */
	queryPool?: string;

	/**
	 * label布局
	 * 默认左右结构
	 * inner 为label在输入框里面
	 */
	labelLayout?: LabelLayoutType;

	/**
	 * suffix 栅格占位
	 * 默认为 1，如果配置了queryPool，默认为2
	 */
	suffixSpan?: number;

	/**
	 * 折叠时显示的行数
	 * 默认为2
	 */
	collapsedRows?: number;
}

/**
 * label布局
 */
export type LabelLayoutType = 'inner' | 'expand';

/**
 * 表单字段配置
 */
export interface FormFieldI {
	/**
	 * 系统自动生成的id
	 */
	$id?: string;
	/**
	 * 数据模式key，符合property path规则
	 */
	key: string;
	/**
	 * 组件类型
	 */
	type: InputType | 'custom';
	/**
	 * 组件 支持slot component jsx
	 */
	component?: Component | string | CustomFormFieldComponent;
	/**
	 * 组件配置
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
	placeholder?: string | string[];
	/**
	 * 组件数据配置
	 */
	options?: OptionData[] | (() => Promise<OptionData[]>);
	/**
	 * 提示内容
	 */
	tooltip?: string;
	/**
	 * 布局宽度占位，默认位1
	 */
	span?: number | ResponsiveValue;
	/**
	 * field 对 search-form 生效
	 */
	showExpand?: boolean;
}

/**
 * 表单字段组件props
 */
export interface CustomFormFieldComponentProps {
	key?: string;
	/**
	 * 表单数据模型
	 */
	model: Record<string, any>;
	/**
	 * 表单字段配置
	 */
	field: FormFieldI;
	/**
	 * 当前字段对象数据值
	 */
	modelValue: any;
	/**
	 * 数据源
	 */
	options: OptionData[];
	/**
	 * 是否加载中
	 */
	loading: boolean;

	/**
	 * change事件
	 * @param value
	 * @returns
	 */
	onChange: (value: any) => void;

	/**
	 * 是否展开input事件 labelLayout为expand有效
	 */
	isExpandInput?: boolean;

	/**
	 * 是否展开字段 labelLayout为expand有效
	 * @param value
	 * @returns
	 */
	isExpandField?: boolean;

	/**
	 * 是否展开input事件 labelLayout为expand有效
	 */
	onExpandInput?: (value: boolean) => void;

	/**
	 * 是否展开字段 labelLayout为expand有效
	 * @param value
	 * @returns
	 */
	onExpandField?: (value: boolean) => void;
}

/**
 * 自定义组件
 */
export type CustomFormFieldComponent = (props: CustomFormFieldComponentProps) => VNode;

/**
 * 查询组件上下文
 */
export interface SearchFormContextI {
	components: Record<string, Component>;
	slots: Slots;
}

/**
 * 查询组件上下文key
 */
export const SearchFormContextKey: InjectionKey<SearchFormContextI> = Symbol('SearchFormContextKey');
