/**
 * 选择鹅客户入参
 */
export interface SelectCustomerPopProps {
	/**
	 * 标题
	 */
	title: string;
	/**
	 * 已选择的客户ids
	 */
	ids?: (string | number)[];

	/**
	 * 多选还是单选 目前只支持单选
	 */
	multiple?: boolean;

	/**
	 * 是否显示新建客户按钮
	 */
	showCreateBtn?: boolean;
}

/**
 * 添加客户弹窗
 */
export interface AddCustomerProps {
	/**
	 * 客户ID
	 */
	bizId?: string | number;
	/**
	 * 业务类型
	 */
	bizType?: 'add' | 'edit';
}
