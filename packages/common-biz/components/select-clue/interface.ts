/**
 * 选择鹅客户入参
 */
export interface SelectCluePopProps {
	/**
	 * 标题
	 */
	title?: string;
	/**
	 * 已选择的客户ids
	 */
	ids?: (string | number)[];

	/**
	 * 多选还是单选 目前只支持单选
	 */
	multiple?: boolean;
}
