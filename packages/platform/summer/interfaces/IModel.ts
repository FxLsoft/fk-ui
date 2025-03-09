/**
 * 所有模块应该包含一个IModel来启动模块内容
 */
export interface IModel {
	/** Gets called after summer is initialized. What happens depends on model.*/
	start(): void;

	/**
	 * Gets called after summer is destroy.
	 */
	destroy(): void;
}
