/**
 * @title 批量输入框配置
 */
export interface BatchInputProps {
	/**
	 * 业务名称
	 */
	bizName?: string;
	/**
	 * 提示
	 */
	placeholder?: string;
	/**
	 * 描述
	 */
	describe?: string;

	/**
	 * 限制数量
	 */
	limit?: number;
}
