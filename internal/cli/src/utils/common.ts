/**
 * 生成4位ID
 * @returns
 */
export function s4() {
	return Math.trunc((1 + Math.random()) * 0x10000)
		.toString(16)
		.slice(1);
}

/**
 * 生成8位ID
 * @returns
 */
export function s8() {
	return s4() + s4();
}
