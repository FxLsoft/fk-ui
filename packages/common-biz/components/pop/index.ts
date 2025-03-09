import { createApp, nextTick } from 'vue';
import { once } from 'lodash-es';
import { Drawer, Message, Modal, Notification, getOverlay, isFunction, isPromise, isString, omit } from '@erp/common';
import type { Router } from 'vue-router';
import type { PageConfig } from './interface';
import type { DrawerConfig, MessageConfig, ModalConfig, NotificationConfig, RenderContent } from '@erp/common';
import type { App, AppContext, Component, StyleValue } from 'vue';

const DrawerInstanceMap = new Map<string, ReturnType<typeof Drawer.open>>();

type PopHTMLElement = HTMLElement & {
	_close?: () => void;
};

/**
 * @zh 弹窗类型
 */
export class pop {
	/**
	 * 1、设置上下文
	 * 2、对路由的判断进行处理
	 * @param app
	 * @param router
	 */
	static install(app: App, router: Router) {
		Modal._context = app._context;
		Drawer._context = app._context;
		router.afterEach((to, from) => {
			const toRouterId = to.meta?.router_id as string;
			const fromRouterId = from.meta?.router_id as string;
			nextTick(() => {
				if (pop.container && fromRouterId) {
					document.body.querySelectorAll(`[router-id="${fromRouterId}"]`).forEach((el: HTMLElement) => {
						el.style.display = 'none';
					});
				}
				if (pop.container && toRouterId) {
					document.body.querySelectorAll(`[router-id="${toRouterId}"]`).forEach((el: HTMLElement) => {
						el.style.display = '';
					});
				}
			});
		});
	}

	/**
	 * 根据routerId销毁pop
	 * @param routerId
	 */
	static destroyByRouterId(routerId: string) {
		document.body.querySelectorAll(`[router-id="${routerId}"]`).forEach((el: PopHTMLElement) => {
			if (el._close) {
				try {
					el._close();
					el._close = null;
				} catch (error) {
					console.error(error);
				}
			}
			el.remove();
		});
	}
	/**
	 * pop挂载的锚点
	 */
	static container: string | HTMLElement;
	/**
	 * @zh 打开对话框（简单模式）
	 */
	static confirm(content: RenderContent, config?: Partial<ModalConfig>) {
		return new Promise((resolve, reject) => {
			const _config: ModalConfig = {
				title: '温馨提示',
				content,
				closable: true,
				onOk: resolve,
				onCancel: reject,
				...config,
			};
			Modal.confirm(_config);
		});
	}

	/**
	 * @zh 创建新的页面
	 */
	static async createPage<T = Record<string, any>>(
		component: Component | Promise<Component | { default: Component }>,
		config?: PageConfig & Record<string, any>,
		appContext?: AppContext,
	) {
		if (isPromise<{ default: Component }>(component)) {
			component = await component.then(res => {
				return res?.default || res;
			});
		}
		const _component = component as Component;
		let container = getOverlay('page') as PopHTMLElement;
		let body = config?.popupContainer || pop.container || document.body;
		if (isString(body)) {
			body = (document.querySelector(body) as HTMLElement) || document.body;
		}
		if (config?.id) {
			container.setAttribute('overlay-id', config.id);
		}
		return new Promise<T>((resolve, reject) => {
			let state = 0;
			const handleOk = params => {
				if (app._instance) {
					app._instance.props.visible = false;
				}
				if (isFunction(config?.onOk)) {
					config!.onOk(params);
				}
				state = 1;
				resolve(params);
				setTimeout(() => {
					handleClose();
				}, 1000);
			};

			const handleCancel = params => {
				if (app._instance) {
					app._instance.props.visible = false;
				}

				if (isFunction(config?.onCancel)) {
					config!.onCancel(params);
				}
				state = -1;
				reject(params);
				setTimeout(() => {
					handleClose();
				}, 1000);
			};

			const handleClose = once(async () => {
				console.log('page close...');
				if (state === 0) {
					state = -1;
					reject();
				}
				await nextTick();
				if (container) {
					app.unmount();
					delete container._close;
					(body as HTMLElement).removeChild(container);
				}
				container = null;

				if (isFunction(config?.onClose)) {
					config!.onClose();
				}
			});
			const defaultConfig: Record<string, any> = {
				renderToBody: false,
				unmountOnClose: true,
				popupContainer: pop.container,
				onOk: handleOk,
				onCancel: handleCancel,
				onClose: handleClose,
			};
			const app = createApp(_component, {
				...defaultConfig,
				...omit(config!, ['onOk', 'onCancel', 'onClose']),
			});
			app._context.components = appContext?.components || Modal._context?.components;
			app._context.directives = appContext?.directives || Modal._context?.directives;
			// 全局 方法继承主应用
			app._context.config.globalProperties =
				appContext?.config.globalProperties || Modal._context?.config.globalProperties || app._context.config.globalProperties;
			app.mount(container!);
			(body as HTMLElement).appendChild(container!);
			if (pop.container) {
				const context = appContext || Modal._context;
				const routerId = context?.config.globalProperties.$route?.meta?.router_id as string;
				if (routerId) {
					container.setAttribute('router-id', routerId);
				}
			}
			(container as PopHTMLElement)._close = handleClose;
		});
	}

	/**
	 * @zh 打开Modal
	 * @param component 组件
	 * @param params 组件入参
	 * @param config modal 相关配置
	 * @returns
	 */
	static async createModal(component: Component | Promise<Component | { default: Component }>, params?, config?: Partial<ModalConfig>) {
		if (isPromise<{ default: Component }>(component)) {
			component = await component.then(res => {
				return res?.default || res;
			});
		}
		const _component = component as any;
		return new Promise((resolve, reject) => {
			const _config: ModalConfig = {
				title: _component.name,
				content: _component,
				closable: true,
				onOk: resolve,
				onCancel: reject,
				onClose() {
					delete (instance.container as PopHTMLElement)._close;
				},
				model: params,
				popupContainer: pop.container,
				...config,
			};
			const instance = Modal.open(_config);
			if (pop.container) {
				const context = Modal._context;
				const routerId = context.config?.globalProperties.$route?.meta?.router_id as string;
				if (routerId) {
					instance.container.setAttribute('router-id', routerId);
					(instance.container as PopHTMLElement)._close = instance.close;
				}
			}
		});
	}

	/**
	 * @zh 关闭 Drawer
	 * @param id
	 */
	static closeDrawer(id: string) {
		if (DrawerInstanceMap.has(id)) {
			const instance = DrawerInstanceMap.get(id);
			instance.close();
			DrawerInstanceMap.delete(id);
			return true;
		}
		return false;
	}

	/**
	 * @zh 是否存在Drawer
	 * @param id
	 */
	static hasDrawer(id: string) {
		return DrawerInstanceMap.get(id);
	}

	/**
	 * @zh 打开 Drawer
	 * @param component
	 * @param config
	 * @returns
	 */
	static async createDrawer(
		component: Component | Promise<Component | { default: Component }>,
		config?: Partial<DrawerConfig & { id?: string; style?: StyleValue }>,
	) {
		if (config?.id && DrawerInstanceMap.has(config.id)) {
			const returnInstance = DrawerInstanceMap.get(config.id);
			returnInstance.close();
			DrawerInstanceMap.delete(config.id);
		}
		if (isPromise<{ default: Component }>(component)) {
			component = await component.then(res => {
				return res?.default || res;
			});
		}
		const _component = component as any;

		return new Promise((resolve, reject) => {
			const _config: DrawerConfig = {
				title: _component.name,
				content: _component,
				closable: true,
				popupContainer: pop.container,
				width: 'auto',
				onOk: resolve,
				onCancel: reject,
				onClose() {
					if (config?.id) {
						DrawerInstanceMap.delete(config.id);
					}
					delete (_instance.container as PopHTMLElement)._close;
				},
				...config,
			};
			const _instance = Drawer.open(_config);
			if (config?.id) {
				DrawerInstanceMap.set(config.id, _instance);
			}
			if (pop.container) {
				const context = Modal._context;
				const routerId = context?.config.globalProperties.$route?.meta?.router_id as string;
				if (routerId) {
					_instance.container.setAttribute('router-id', routerId);
					(_instance.container as PopHTMLElement)._close = _instance.close;
				}
			}
		});
	}

	/**
	 * @zh — 显示信息提示
	 * @param config
	 * @returns
	 */
	static info(config: string | MessageConfig) {
		return Message.info(config);
	}

	/**
	 * @zh — 显示成功提示
	 * @param config
	 * @returns
	 */
	static success(config: string | MessageConfig) {
		return Message.success(config);
	}

	/**
	 * @zh — 显示警告提示
	 * @param config
	 * @returns
	 */
	static warning(config: string | MessageConfig) {
		return Message.warning(config);
	}

	/**
	 * @zh — 显示错误提示
	 * @param config
	 * @returns
	 */
	static error(config: string | MessageConfig) {
		return Message.error(config);
	}

	/**
	 * @zh — 显示信息通知
	 * @param config
	 * @returns
	 */
	static inf(config: string | NotificationConfig) {
		return Notification.info(mergeNotificationConfig(config));
	}

	/**
	 * @zh — 显示成功通知
	 * @param config
	 * @returns
	 */
	static succ(config: string | NotificationConfig) {
		return Notification.success(mergeNotificationConfig(config));
	}

	/**
	 * @zh — 显示警告通知
	 * @param config
	 * @returns
	 */
	static warn(config: string | NotificationConfig) {
		return Notification.warning(mergeNotificationConfig(config));
	}

	/**
	 * @zh — 显示错误通知
	 * @param config
	 * @returns
	 */
	static err(config: string | NotificationConfig) {
		return Notification.error(mergeNotificationConfig(config));
	}

	/**
	 * 全局加载
	 * @param config
	 * @returns
	 */
	static loading(config?: string | MessageConfig) {
		const messageConfig: MessageConfig = {
			content: '正在加载...',
			duration: 0,
		};
		if (isString(config)) {
			messageConfig.content = config;
		} else {
			Object.assign(messageConfig, config);
		}
		return Message.loading(messageConfig);
	}
}

function mergeNotificationConfig(config: string | NotificationConfig): NotificationConfig {
	const baseConfig: Partial<NotificationConfig> = {
		title: '消息通知',
		closable: true,
		duration: 3000,
	};
	if (isString(config)) {
		return {
			...baseConfig,
			content: config,
		};
	}
	return {
		...baseConfig,
		...config,
	};
}
