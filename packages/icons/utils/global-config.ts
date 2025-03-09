const CLASS_PREFIX = 'fk';

export function getPrefixCls(componentName: string) {
	const prefix = CLASS_PREFIX;
	if (componentName) {
		return `${prefix}-${componentName}`;
	}
	return prefix;
}
