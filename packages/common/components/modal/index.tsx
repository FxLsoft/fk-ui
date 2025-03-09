import { createVNode, nextTick, render } from 'vue';
import { once } from 'lodash-es';
import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import { MESSAGE_TYPES } from '../_utils/constant';
import { getOverlay } from '../_utils/dom';
import { isFunction, isObject, isString } from '../_utils/is';
import { omit } from '../_utils/omit';
import { getSlotFunction } from '../_utils/vue-utils';
import _Modal from './modal.vue';
import type { ModalConfig, ModalMethod, ModalUpdateConfig } from './interface';
import type { GlobalOptions } from '../_utils/types';
import type { App, AppContext } from 'vue';

const open = (config: ModalConfig, appContext?: AppContext) => {
	let container: HTMLElement | null = getOverlay('modal');
	let componentId: string;
	let body = config.popupContainer || document.body;
	if (config.id) {
		container.setAttribute('overlay-id', config.id);
	}
	if (isString(body)) {
		body = (document.querySelector(body) as HTMLElement) || document.body;
	}
	const handleOk = param => {
		if (vm.component) {
			vm.component.props.visible = false;
		}

		if (isFunction(config.onOk)) {
			config.onOk(param);
		}
	};

	const handleCancel = param => {
		if (vm.component) {
			vm.component.props.visible = false;
		}

		if (isFunction(config.onCancel)) {
			config.onCancel(param);
		}
	};

	const handleClose = async () => {
		console.log('modal close...');
		await nextTick();
		if (container) {
			render(null, container);
			vm.appContext = null;
			container.remove();
		}
		if (componentId) {
			delete _Modal.components[componentId];
			componentId = null;
		}
		container = null;
		onceClose();
	};

	const onceClose = once(() => {
		if (isFunction(config.onClose)) {
			config.onClose();
		}
	});

	const handleReturnClose = () => {
		if (vm.component) {
			vm.component.props.visible = false;
		}
		onceClose();
	};

	const handleUpdateConfig = (config: ModalUpdateConfig) => {
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
			componentId = defaultVn.name || `Virtual:${Math.random().toString().replace('.', '')}`;
			_Modal.components[componentId] = defaultVn;
			defaultConfig.componentId = componentId;
			defaultVn = undefined;
		} else {
			defaultVn = getSlotFunction(defaultVn);
		}
	}

	const vm = createVNode(
		_Modal,
		{
			...defaultConfig,
			...omit(config, ['content', 'title', 'footer', 'visible', 'unmountOnClose', 'onOk', 'onCancel', 'onClose']),
			...{
				footer: typeof config.footer === 'boolean' ? config.footer : undefined,
			},
		},
		{
			default: getSlotFunction(defaultVn),
			title: getSlotFunction(config.title),
			footer: typeof config.footer !== 'boolean' ? getSlotFunction(config.footer) : undefined,
		},
	);

	if (appContext ?? Modal._context) {
		vm.appContext = appContext ?? Modal._context;
	}

	render(vm, container);
	body.appendChild(container);

	return {
		close: handleReturnClose,
		update: handleUpdateConfig,
		container,
	};
};

const modal: ModalMethod = {
	open,
	confirm: (config: ModalConfig, appContext?: AppContext) => {
		const _config: ModalConfig = { simple: true, messageType: 'warning', ...config };

		return open(_config, appContext);
	},
	...MESSAGE_TYPES.reduce((pre, value) => {
		pre[value] = (config: ModalConfig, appContext?: AppContext) => {
			const _config = {
				simple: true,
				hideCancel: true,
				messageType: value,
				...config,
			};
			return open(_config, appContext);
		};

		return pre;
	}, {} as Pick<ModalMethod, 'info' | 'success' | 'warning' | 'error'>),
};

const Modal = Object.assign(_Modal, {
	...modal,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Modal.name, _Modal);

		const modalWithContext = {} as ModalMethod;

		for (const key of Object.keys(modal) as (keyof ModalMethod)[]) {
			modalWithContext[key] = (config, appContext = app._context) => modal[key](config, appContext);
		}

		app.config.globalProperties.$modal = modalWithContext;

		Modal._context = app._context;
	},
	_context: null as AppContext | null,
});

export type { ModalMethod, ModalConfig, ModalReturn } from './interface';

export default Modal;
