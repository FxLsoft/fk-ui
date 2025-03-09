import { Bean } from '../context/Context';
import type { IEventEmitter } from '../interfaces/IEventEmitter';
import type { SrEvent } from '../events/Events';

type EventType<E extends SrEvent> = Pick<E, 'type'>['type'];
@Bean('eventService')
export class EventService<E extends SrEvent = SrEvent> implements IEventEmitter {
	private allSyncListeners = new Map<EventType<E>, Set<Function>>();
	private allAsyncListeners = new Map<EventType<E>, Set<Function>>();

	private globalSyncListeners = new Set<Function>();
	private globalAsyncListeners = new Set<Function>();

	private asyncFunctionsQueue: Function[] = [];
	private scheduled = false;

	private firedEvents: { [key: string]: E } = {};

	public clear() {
		this.allSyncListeners = new Map<EventType<E>, Set<Function>>();
		this.allAsyncListeners = new Map<EventType<E>, Set<Function>>();

		this.globalSyncListeners = new Set<Function>();
		this.globalAsyncListeners = new Set<Function>();

		this.asyncFunctionsQueue = [];
		this.scheduled = false;

		this.firedEvents = {};
	}

	private getListeners(eventType: EventType<E>, async: boolean): Set<Function> {
		const listenerMap = async ? this.allAsyncListeners : this.allSyncListeners;
		let listeners = listenerMap.get(eventType);

		if (!listeners) {
			listeners = new Set<Function>();
			listenerMap.set(eventType, listeners);
		}

		return listeners;
	}

	public addEventListener(eventType: EventType<E>, listener: Function, async = false): void {
		this.getListeners(eventType, async).add(listener);
	}

	public on(eventType: EventType<E>, listener: Function, async = false): void {
		this.getListeners(eventType, async).add(listener);
		if (this.firedEvents[eventType]) {
			listener(this.firedEvents[eventType]);
		}
	}

	public removeEventListener(eventType: EventType<E>, listener: Function, async = false): void {
		this.getListeners(eventType, async).delete(listener);
	}

	public addGlobalListener(listener: Function, async = false): void {
		(async ? this.globalAsyncListeners : this.globalSyncListeners).add(listener);
	}

	public removeGlobalListener(listener: Function, async = false): void {
		(async ? this.globalAsyncListeners : this.globalSyncListeners).delete(listener);
	}

	public dispatchEvent(event: E): void {
		this.dispatchToListeners(event, true);
		this.dispatchToListeners(event, false);

		this.firedEvents[event.type] = event;
	}

	public dispatchEventOnce(event: E): void {
		if (!this.firedEvents[event.type]) {
			this.dispatchEvent(event);
		}
	}

	private dispatchToListeners(event: E, async: boolean) {
		const eventType = event.type;
		const processEventListeners = (listeners: Set<Function>) =>
			listeners.forEach(listener => {
				if (async) {
					this.dispatchAsync(() => listener(event));
				} else {
					listener(event);
				}
			});

		processEventListeners(this.getListeners(eventType, async));

		const globalListeners = async ? this.globalAsyncListeners : this.globalSyncListeners;

		globalListeners.forEach(listener => {
			if (async) {
				this.dispatchAsync(() => listener(eventType, event));
			} else {
				listener(eventType, event);
			}
		});
	}
	private dispatchAsync(func: Function): void {
		this.asyncFunctionsQueue.push(func);
		if (!this.scheduled) {
			window.setTimeout(this.flushAsyncQueue.bind(this), 0);
			this.scheduled = true;
		}
	}
	private flushAsyncQueue(): void {
		this.scheduled = false;
		const queueCopy = this.asyncFunctionsQueue.slice();
		this.asyncFunctionsQueue = [];
		queueCopy.forEach(func => func());
	}
}
