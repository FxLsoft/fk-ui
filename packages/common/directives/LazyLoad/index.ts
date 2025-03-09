/**
 * 图片懒加载指令
 * @author FxLsoft
 */

import { getParentScroller, isFunction } from '../../utils';
import type { Directive, DirectiveBinding } from 'vue';

/**
 * 图片缓存对象，已缓存的直接展示图片
 */
const IMG_CACHE = {};

// 图片加载默认URL 空白图片
export const DEFAULT_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// 创建一个标签异步加载图片
const loadImageAsync = (src, resolve, reject) => {
	const image = new Image();
	image.src = src;
	// 图片加载成功回调
	image.onload = () => {
		resolve({
			src: image.src,
		});
	};
	// 图片加载失败回调
	image.onerror = e => {
		reject(e);
	};
};

interface LazyOptions {
	delayMs?: number;
	preLoad?: number;
	callback?: Function;
}

function getDefaultValue(value, defaultValue) {
	if (typeof value === 'undefined') {
		return defaultValue;
	} else {
		return value;
	}
}

/**
 * 懒加载监听器
 */
class Listener implements LazyOptions {
	// 滚动停止后的延时(过后才开始检测是否触发callback)
	delayMs = 100;
	preLoad = 1;
	// 滚动到可见之后就触发callback(el, function(success){}), el是当前element, 通过function的调用来判断
	callback: Function = null;
	func: (this: HTMLElement, ev: Event | IntersectionObserverEntry) => any;

	private el: HTMLElement;
	private scrollView: HTMLElement;
	private state: 'waiting' | 'busy' | 'done';
	private observer: IntersectionObserver;

	constructor(el, options: LazyOptions) {
		if (options) {
			this.delayMs = getDefaultValue(options.delayMs, 100);
			this.preLoad = getDefaultValue(options.preLoad, 1);
			this.callback = getDefaultValue(options.callback, null);
		}
		this.el = el;
		setTimeout(() => {
			this.reset();
		});
	}

	// 绑定事件
	bindEvent() {
		// 如果没绑过事件
		if (!this.func) {
			let t;
			if (this.delayMs > 0) {
				this.func = () => {
					if (t) {
						window.clearTimeout(t);
					}
					t = window.setTimeout(this.check.bind(this), this.delayMs);
				};
			} else {
				this.func = this.check.bind(this);
			}
			if (!this.bindObserver()) {
				this.bindScroller();
			}
		}
	}

	bindObserver() {
		if (!this.observer && this.el && IntersectionObserver) {
			this.observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						this.func.call(this.el, entry);
					}
				});
			});
			this.observer.observe(this.el);
			return true;
		}
		return false;
	}

	bindScroller() {
		this.scrollView = getParentScroller(this.el);
		this.scrollView.addEventListener('scroll', this.func, false);
		window.addEventListener('resize', this.func, false);
	}

	// 解绑事件
	unbindEvent() {
		if (this.func) {
			this.scrollView?.removeEventListener('scroll', this.func);
			window.removeEventListener('resize', this.func);
			this.func = null;
			this.scrollView = null;
			this.observer?.disconnect();
			this.observer = null;
		}
	}

	// 检查是否可以触发callback
	check() {
		if (this.state === 'waiting' && this.checkElInView()) {
			this.onCallback();
		}
	}

	// 检查el是否在视图内
	checkElInView() {
		// 如果dom里有immediately属性，那么就立即获取
		if (this.el.getAttribute('immediately') !== null) return true;
		const rect = this.el.getBoundingClientRect();
		const isInView = rect.top < window.innerHeight * this.preLoad && rect.bottom > 0 && rect.left < window.innerWidth * this.preLoad && rect.right > 0;
		return isInView;
	}

	// 触发callback
	onCallback() {
		this.state = 'busy';
		this.callback &&
			this.callback(isSuccess => {
				if (isSuccess) {
					this.state = 'done';
					this.unbindEvent();
				} else {
					this.state = 'waiting';
				}
			});
	}

	// 回收
	destroy() {
		console.log('destroy >>');
		this.unbindEvent();
	}

	// 重置
	reset() {
		// waiting 等待状态 (监听事件)
		// busy 已经触发回调 (监听事件但不再触发回调)
		// done 完成状态 (事件注销, 回调释放)
		this.state = 'waiting';
		this.bindEvent();
		this.check();
	}
}

/**
 * 图片懒加载
 *	注册： directives: { lazy: vLazy, }
 *	使用：<img v-lazy="src" />
 */
export const vLazy: Directive = {
	// 被绑定元素插入父节点时调用
	mounted(el, binding: DirectiveBinding, vnode) {
		el.attributes['lazy-src'] = el.src || binding.value;
		el.src = IMG_CACHE[binding.value || 'default'] || DEFAULT_URL;
		el.__listener = new Listener(el, {
			callback(handler) {
				const src = el.attributes['lazy-src'];
				loadImageAsync(
					src,
					data => {
						el.src = data.src;
						// 缓存下已加载成功的图片
						IMG_CACHE[data.src] = data.src;
						handler(true);
					},
					err => {
						handler(false);
					},
				);
			},
		});
	},
	// 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
	updated(el, binding: DirectiveBinding, vnode) {
		// 如果src 没变不更新el
		if (binding.value !== binding.oldValue) {
			el.src = IMG_CACHE[binding.value] || DEFAULT_URL;
			el.attributes['lazy-src'] = binding.value;
			el.__listener.reset();
		}
	},
	// 只调用一次，指令与元素解绑时调用。
	beforeUnmount(el, binding: DirectiveBinding, vnode) {
		el.__listener && el.__listener.destroy();
		delete el.__listener;
	},
};

/**
 * 通用DOM节点懒加载
 *	注册： directives: { lazyLoad: vLazyLoad, }
 *	使用：<HTMLElement v-lazyLoad="{load: () => boolean | Promise<boolean>}, param: any" />
 *  @param load: 懒加载回调函数
 *  @param param: 懒加载回调函数的参数 (可选) 根据参数的变化来判断是否重新加载
 */
export const vLazyLoad: Directive = {
	// 被绑定元素插入父节点时调用
	mounted(el, binding: DirectiveBinding, vnode) {
		el.lazyParams = binding.value;
		createElListener(el, vnode);
		// 给 el 添加key
		if (typeof vnode.key !== 'undefined') {
			el.key = vnode.key;
		}
	},

	// 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
	updated(el, binding: DirectiveBinding, vnode) {
		// 如果当前el的key没有变，那么不更新el
		if (binding.value?.param != binding.oldValue?.param) {
			el.lazyParams = binding.value;
			if (el.__listener) {
				el.__listener.reset();
			} else {
				createElListener(el, vnode);
			}
		}
	},

	// 只调用一次，指令与元素解绑时调用。
	beforeUnmount(el, binding: DirectiveBinding, vnode) {
		el.__listener && el.__listener.destroy();
		delete el.__listener;
		delete el.lazyParams;
	},
};

function createElListener(el, vnode) {
	if (!el.lazyParams) return;
	el.__listener = new Listener(el, {
		callback(handler) {
			const load = isFunction(el.lazyParams) ? el.lazyParams : el.lazyParams?.load;
			const result = load.call(vnode.appContext, el, el.lazyParams?.param);
			if (result instanceof Promise) {
				result
					.then(() => {
						handler(true);
					})
					.catch(() => {
						handler(false);
					});
			} else {
				handler(result);
			}
		},
	});
}

/**
 * 懒加载回调函数
 */
export type LazyLoadCallback<T = any> = (params: { el: HTMLElement; param: T }) => Promise<boolean> | boolean;
