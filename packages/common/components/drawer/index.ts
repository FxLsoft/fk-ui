import { createVNode, nextTick, render } from 'vue';
import { once } from 'lodash-es';
import { getOverlay } from '../_utils/dom';
import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import { isFunction, isObject, isString } from '../_utils/is';
import { omit } from '../_utils/omit';
import { getSlotFunction } from '../_utils/vue-utils';
import _Drawer from './drawer.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App, AppContext } from 'vue';
import type { DrawerConfig, DrawerMethod, DrawerUpdateConfig } from './interface';

const open = (config: DrawerConfig, appContext?: AppContext) => {
	let container: HTMLElement | null = getOverlay('drawer');
	let componentId: string;
	let body = config.popupContainer || document.body;
	if (config.id) {
		container.setAttribute('overlay-id', config.id);
	}
	if (isString(body)) {
		body = (document.querySelector(body) as HTMLElement) || document.body;
	}
	const handleOk = params => {
		if (vm.component) {
			vm.component.props.visible = false;
		}

		if (isFunction(config.onOk)) {
			config.onOk(params);
		}
	};

	const handleCancel = params => {
		if (vm.component) {
			vm.component.props.visible = false;
		}

		if (isFunction(config.onCancel)) {
			config.onCancel(params);
		}
	};

	const onceClose = once(() => {
		if (isFunction(config.onClose)) {
			config.onClose();
		}
	});

	const handleClose = async () => {
		console.log('drawer close...');
		await nextTick();
		if (container) {
			render(null, container);
			vm.appContext = null;
			container.remove();
		}
		if (componentId) {
			delete _Drawer.components[componentId];
			componentId = null;
		}
		container = null;

		onceClose();
	};

	const handleReturnClose = () => {
		if (vm.component) {
			vm.component.props.visible = false;
		}
		onceClose();
	};

	const handleUpdateConfig = (config: DrawerUpdateConfig) => {
		if (vm.component) {
			Object.entries(config).forEach(([key, value]) => {
				vm.component!.props[key] = value;
			});
		}
	};

	const defaultConfig: Record<string, any> = {
		visible: true,
		renderToBody: false,
		unmountOnClose: true,
		onOk: handleOk,
		onCancel: handleCancel,
		onClose: handleClose,
	};

	let defaultVn: any = config.content;
	if (defaultVn) {
		if (isObject(defaultVn) && ((defaultVn as any).render || (defaultVn as any).setup)) {
			componentId = `Virtual:${Math.random().toString().replace('.', '')}`;
			Drawer.components[componentId] = defaultVn;
			defaultConfig.componentId = componentId;
			defaultVn = undefined;
		} else {
			defaultVn = getSlotFunction(defaultVn);
		}
	}
	const props = {
		...defaultConfig,
		...omit(config, ['content', 'title', 'footer', 'visible', 'unmountOnClose', 'onOk', 'onCancel', 'onClose']),
		...{
			header: typeof config.header === 'boolean' ? config.header : undefined,
			footer: typeof config.footer === 'boolean' ? config.footer : undefined,
		},
	};
	const vm = createVNode(_Drawer, props, {
		default: getSlotFunction(defaultVn),
		header: typeof config.header !== 'boolean' ? getSlotFunction(config.header) : undefined,
		title: getSlotFunction(config.title),
		footer: typeof config.footer !== 'boolean' ? getSlotFunction(config.footer) : undefined,
	});

	if (appContext ?? Drawer._context) {
		vm.appContext = appContext ?? Drawer._context;
	}

	render(vm, container);
	body.appendChild(container);
	const returnInstance = {
		close: handleReturnClose,
		update: handleUpdateConfig,
		container,
	};
	return returnInstance;
};

const Drawer = Object.assign(_Drawer, {
	open,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Drawer.name, _Drawer);

		const drawerWithContext: DrawerMethod = {
			open: (config, appContext = app._context) => open(config, appContext),
		};

		app.config.globalProperties.$drawer = drawerWithContext;
		Drawer._context = app._context;
	},
	_context: null as AppContext | null,
});

export type { DrawerMethod, DrawerConfig, DrawerReturn } from './interface';

export type DrawerInstance = InstanceType<typeof _Drawer>;

export default Drawer;
