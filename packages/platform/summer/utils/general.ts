function isEqualToType(target: any, type: string): boolean {
	return Object.prototype.toString.call(target).slice(8, -1) === type;
}

export class Utils {
	/**
	 * Loads the template and returns it as an element. makes up for no simple way in
	 * the dom api to load html directly, eg we cannot do this: document.createElement(template)
	 * @param {string} template
	 * @returns {HTMLElement}
	 */
	static loadTemplate(template: string): HTMLElement {
		const tempDiv = document.createElement('div');

		tempDiv.innerHTML = template.trim();
		return tempDiv.firstElementChild as HTMLElement;
	}

	static iterateObject<T>(object: { [p: string]: T } | T[] | undefined, callback: (key: string, value: T) => void) {
		if (!object || this.missing(object)) {
			return;
		}

		if (Array.isArray(object)) {
			object.forEach((value, index) => callback(`${index}`, value));
		} else {
			Object.keys(object).forEach(key => callback(key, object[key]));
		}
	}

	static missing(value: any): boolean {
		return !this.exists(value);
	}

	static exists(value: any, allowEmptyString = false): boolean {
		return value != null && value != undefined && (value !== '' || allowEmptyString);
	}

	static values = <T>(object: { [key: string]: T }): T[] => Object.keys(object).map(key => object[key]);

	/**
	 * 判断是否是字符串
	 */
	static isString(target: any): boolean {
		return isEqualToType(target, 'String');
	}

	/**
	 * 判断是否是Date类型
	 * @param target
	 * @returns
	 */
	static isDate(target: any): boolean {
		return isEqualToType(target, 'Date');
	}

	/**
	 * 判断是否是数字
	 * @param target
	 * @returns
	 */
	static isNumber(target: any): boolean {
		return isEqualToType(target, 'Number');
	}

	/**
	 * 判断是否是Object
	 * @param target
	 * @returns
	 */
	static isObject(target: any): boolean {
		return isEqualToType(target, 'Object');
	}

	/**
	 * 判断是否是Array类型
	 * @param target
	 * @returns
	 */
	static isArray(target: any): boolean {
		return isEqualToType(target, 'Array');
	}

	/**
	 * 判断是否是 Function 类型
	 * @param target
	 * @returns
	 */
	static isFunction(target: any): boolean {
		return isEqualToType(target, 'Function');
	}

	/**
	 * 判断是否是 Boolean 类型
	 * @param target
	 * @returns
	 */
	static isBoolean(target: any): boolean {
		return isEqualToType(target, 'Boolean');
	}

	/**
	 * 注入样式
	 * @param css
	 */
	static styleInject(css) {
		css = css || '';
		const head = document.head || document.getElementsByTagName('head')[0];
		const style = document.createElement('style');
		style.type = 'text/css';
		if ((style as any).styleSheet) {
			(style as any).styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	}
}

export const _ = Utils;
