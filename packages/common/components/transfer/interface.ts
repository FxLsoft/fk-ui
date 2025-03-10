export interface TransferItem {
	/**
	 * @zh 选项的值
	 * @en Option value
	 */
	value: string;
	/**
	 * @zh 选项的标签
	 * @en Option label
	 */
	label: string;
	/**
	 * @zh 是否禁用
	 * @en Whether to disable
	 */
	disabled: boolean;

	/**
	 * @zh 排序
	 */
	sort: number;
}

export interface DataInfo {
	data: TransferItem[];
	allValidValues: string[];
	selected: string[];
	validSelected: string[];
}
