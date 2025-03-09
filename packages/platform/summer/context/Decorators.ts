/**
 * 缓存值
 * @param _target
 * @param key
 * @param descriptor
 */
export function memoize(_target: any, key: string, descriptor: PropertyDescriptor) {
	let fnKey: string | null = null;
	let fn: Function | null = null;

	if (typeof descriptor.value === 'function') {
		fnKey = 'value';
		fn = descriptor.value;

		if (fn!.length !== 0) {
			console.warn('Memoize should only be used in functions with zero parameters');
		}
	} else if (typeof descriptor.get === 'function') {
		fnKey = 'get';
		fn = descriptor.get;
	}
	if (!fn) {
		throw new Error('not supported');
	}
	let memoize;
	descriptor[fnKey!] = function (...args: any[]) {
		if (typeof memoize === 'undefined') {
			memoize = fn!.apply(this, args);
		}
		return memoize;
	};
}
