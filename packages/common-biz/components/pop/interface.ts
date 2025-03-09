/**
 * page 参数
 */
export interface PageConfig {
	id?: string;
	/**
	 * @zh 标题
	 * @en Title
	 */
	title?: string;

	/**
	 * @zh 业务ID 用于编辑、查询
	 */
	bizId?: string;

	/**
	 * @zh 操作的业务类型
	 */
	bizType?: string;

	/**
	 * @zh 操作的数据模型
	 */
	bizModel?: Record<string, any>;

	/**
	 * @zh 业务无关的参数
	 */
	bizParams?: Record<string, any>;

	/**
	 * @zh 点击确定按钮的回调函数
	 * @en Callback function for clicking the OK button
	 */
	onOk?: (e?: any) => void;
	/**
	 * @zh 点击取消按钮的回调函数
	 * @en Callback function for clicking the Cancel button
	 */
	onCancel?: (e?: any) => void;
	/**
	 * @zh 对话框关闭后（动画结束）触发
	 * @en Triggered after the modal is closed (the animation ends)
	 */
	onClose?: () => void;

	/**
	 * @zh 弹出框的挂载容器
	 * @en Mount container for modal
	 * @defaultValue 'body'
	 */
	popupContainer?: string | HTMLElement;
}

/**
 * 弹窗返回的数据
 */
export interface PageExpose {
	/**
	 * 获取数据模型
	 */
	getModel(): Record<string, any> | Promise<Record<string, any>>;
}

/**
 * 弹窗内容触发的事件
 */
export interface PageEmits {
	/**
	 * 对应调用弹窗返回的Promise里的resolve
	 */
	(event: 'ok', param?: any): void;
	/**
	 * 对应弹窗调用Promise的reject
	 */
	(event: 'close', param?: any): void;
	/**
	 * 弹窗的loading
	 */
	(event: 'loading', l: boolean): void;
}
