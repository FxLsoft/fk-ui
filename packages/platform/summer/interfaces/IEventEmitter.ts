/**
 * 事件基础
 * 典型的门面模式
 */
export interface IEventEmitter {
	addEventListener(eventType: string, listener: Function, async?: boolean): void;
	removeEventListener(eventType: string, listener: Function, async?: boolean): void;
}
