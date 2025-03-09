/**
 * 拖拽相关配置
 */
export interface DraggableProps {
	/**
	 * 数据唯一标识
	 * @defaultValue value
	 */
	itemKey?: string;
	/**
	 * 拖拽锚点
	 * @defaultValue .draggable-handle
	 */
	handle?: string;
	/**
	 * 克隆对象
	 */
	clone?: (original: any) => any;
	/**
	 * 拖拽后change事件
	 */
	onChange?: (evt: any) => void;
	/**
	 * 拖拽start事件
	 */
	onStart?: (evt: any) => void;
	/**
	 * 拖拽remove事件
	 */
	onRemove?: (evt: any) => void;
	/**
	 * 拖拽update事件
	 */
	onUpdate?: (evt: any) => void;
	/**
	 * 拖拽end事件
	 */
	onEnd?: (evt: any) => void;
}
