/**
 * size是否是数字类型
 * @param size
 * @returns
 */
export function isNumberSize(size: any) {
	return /^[0-9.]$/.test(size);
}
