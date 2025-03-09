/**
 * 输入组件通用数据源
 */
export interface OptionData {
	/**
	 * @zh 选项值
	 * @en Option Value
	 */
	value?: string | number | boolean | Record<string, any>;
	/**
	 * @zh 选项内容
	 * @en Option content
	 */
	label?: string;
	/**
	 * @zh 是否禁用
	 * @en Whether to disable
	 */
	disabled?: boolean;
	/**
	 * 树形结构
	 */
	children?: OptionData[];
}

/**
 * 数据模型类型
 */
export type ModelValueType = string | boolean | number | object | (string | boolean | number | object)[];

/**
 * 输入组件类型枚举
 */
export const InputKeys = [
	'textarea', // 文本域输入
	'text', // 文本输入
	'search-input', // 查询输入
	'batch-input',
	'html-input',
	'number', // 数字输入
	'integer',
	'date',
	'datetime',
	'rangedate',
	'autocomplete',
	'checkbox',
	'radio',
	'select',
	'cascader',
	'tree',
	'upload',
	'switch',
	'password',
	'select-shop',
	'goods-category',
	'dic',
	'rich-text',
	'time',
	'range-number',
] as const;

/**
 * 输入组件类型
 */
export type InputType = (typeof InputKeys)[number];

/**
 * 输入组件基本入参
 */
export interface BaseInputProps {
	/**
	 * @zh 绑定值
	 */
	modelValue: string | number | boolean | Record<string, any> | (string | number | Record<string, any>)[];

	/**
	 * @zh 是否允许清空输入框
	 */
	allowClear?: boolean;

	/**
	 * @zh 是否禁用
	 */
	disabled?: boolean;
	/**
	 * @zh 是否多选
	 */
	multiple?: boolean;
	/**
	 * @zh 提示文字
	 */
	placeholder?: string;
}
