import XEUtils from 'xe-utils';
import type { VxeGlobalRenderer, VxeGlobalRendererOptions } from '../../types';

/**
 * 内置的组件渲染
 */
const renderMap: Record<string, VxeGlobalRendererOptions> = {};

/**
 * 全局渲染器
 */
export const renderer: VxeGlobalRenderer = {
	mixin(opts) {
		XEUtils.each(opts, (options, name) => renderer.add(name, options));
		return renderer;
	},
	get(name: string) {
		return renderMap[name] || null;
	},
	add(name, options) {
		if (name && options) {
			const renders: any = renderMap[name];
			if (renders) {
				// 检测是否覆盖

				Object.assign(renders, options);
			} else {
				renderMap[name] = options;
			}
		}
		return renderer;
	},
	forEach(callback) {
		XEUtils.objectEach(renderMap, callback);
		return renderer;
	},
	delete(name) {
		delete renderMap[name];
		return renderer;
	},
};
