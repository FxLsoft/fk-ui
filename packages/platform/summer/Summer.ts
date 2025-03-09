import { Context } from './context/Context';
import { ModuleRegistry } from './modules/ModuleRegistry';
import { Logger, LoggerFactory } from './Logger';
import { loadService } from './services/loader';
import { _ } from './utils';
import { Events } from './events/EventKeys';
import { Constants } from './Constants';
import { OptionsWrapper } from './OptionsWrapper';
import { UserComponentRegistry } from './widgets/framework/userComponentRegistry';
import type { EventService } from './services/EventService';
import type { IComponent } from './interfaces/IComponent';
import type { RegisteredComponentInput } from './widgets/framework/userComponentRegistry';
import type { ReadyEvent } from './events/Events';
import type { IModel } from './interfaces/IModel';
import type { IModule } from './interfaces/IModule';
import type { ComponentMeta, ContextParams } from './context/Context';
import type { SrOptions, SrParams } from './SummerOptions';

export class Summer<O extends SrOptions = SrOptions, P extends SrParams = SrParams> {
	private context: Context;
	logger: Logger;
	options: O;
	params: P;
	rootDiv: HTMLElement;
	destroyed: boolean;

	constructor(el?: HTMLElement | string, options?: O, params?: P) {
		if (el && options) {
			this.create(el, options, params);
		}
	}

	async create(el: HTMLElement | string, options: O, params?: P) {
		let rootDiv: HTMLElement;
		if (_.isString(el)) {
			rootDiv = document.querySelector(el as string);
		} else {
			rootDiv = el as HTMLElement;
		}
		if (!rootDiv) {
			console.error('No present el');
			return;
		}
		this.rootDiv = rootDiv;
		this.options = options;
		this.params = params;
		const modelType = this.getModelType();
		if (ModuleRegistry.isRegisteredAsync(modelType)) {
			return ModuleRegistry.registerAsyncByModuleName(modelType).then(() => {
				return this.init();
			});
		} else {
			return this.init();
		}
	}

	private init() {
		const startTime = Date.now();
		const options = this.options;
		const params = this.params;
		const rootDiv = this.rootDiv;
		const debug = !!options.debug;

		// 注册模块
		const registeredModules = this.getRegisteredModules(params);

		// 实例化 Beans
		const beanClasses = this.createBeansList(registeredModules);

		// 注册 Component
		const stackComponents = this.createStackComponentsList(registeredModules);

		// 实例化 私有Bean
		const providedBeanInstances = this.createProvidedBeans(rootDiv, params);

		if (params.beanClasses) {
			beanClasses.push(...params.beanClasses);
		}

		if (!beanClasses) {
			console.error('No Model Found');
			return;
		}
		const contextParams: ContextParams = {
			providedBeanInstances,
			beanClasses,
			components: stackComponents,
			debug,
		};
		this.logger = new Logger('Summer >> ', () => options.debug);
		const contextLogger = new Logger('Context >> ', () => contextParams.debug);
		this.context = new Context(contextParams, contextLogger);

		this.registerModuleUserComponents(registeredModules);
		// 启动子系统
		this.startApp();
		// 出发事件
		this.dispatchReadyEvent(options);

		this.logger.log(`initialized successfully ${Date.now() - startTime}ms`);

		return this;
	}

	private createProvidedBeans(rootDiv: HTMLElement, params: SrParams) {
		// 外部的Bean
		return {
			rootDiv,
			options: this.options,
			params,
			...params.providedBeanInstances,
		};
	}

	private createBeansList(registeredModules: IModule[]): any[] {
		const appClass = this.getAppClass(registeredModules);
		const beansNoDuplicates: any[] = [];
		// 系统自带的Bean
		const services = loadService();
		const beans = [...services, LoggerFactory, OptionsWrapper, UserComponentRegistry];
		if (appClass) {
			beans.unshift(appClass);
		}
		const moduleBeans = this.extractModuleEntity(registeredModules, module => (module.beans ? module.beans : []));
		beans.push(...moduleBeans);
		beans.forEach(bean => {
			if (!beansNoDuplicates.includes(bean)) {
				beansNoDuplicates.push(bean);
			}
		});
		return beansNoDuplicates;
	}

	private getRegisteredModules(params: SrParams): IModule[] {
		const passedViaConstructor: IModule[] = params ? params.modules : null;
		const registered = ModuleRegistry.getRegisteredModules();

		const allModules: IModule[] = [];
		const mapNames: { [name: string]: boolean } = {};

		// adds to list and removes duplicates
		function addModule(module: IModule) {
			function addIndividualModule(m: IModule) {
				if (!mapNames[m.moduleName]) {
					mapNames[m.moduleName] = true;
					allModules.push(m);
					ModuleRegistry.register(m);
				}
			}

			addIndividualModule(module);
			if (module.dependantModules) {
				module.dependantModules.forEach(addModule);
			}
		}

		if (passedViaConstructor) {
			passedViaConstructor.forEach(addModule);
		}

		if (registered) {
			registered.forEach(addModule);
		}

		return allModules;
	}

	private createStackComponentsList(registeredModules: IModule[]): any[] {
		let components: ComponentMeta[] = [];

		const moduleStackComps = this.extractModuleEntity(registeredModules, (module: IModule) => (module.stackComponents ? module.stackComponents : []));

		components = components.concat(moduleStackComps);

		return components;
	}

	private extractModuleEntity(moduleEntities: any[], extractor: (module: any) => any) {
		return [].concat(...moduleEntities.map(extractor));
	}

	private getModelType(): string {
		let modelType = this.options.modelType;
		if (!modelType) {
			modelType = Constants.DEFAULT_MODEL_TYPE;
		}
		return modelType;
	}

	private getAppClass(registeredModules: IModule[]): any {
		const modelType = this.getModelType();
		const modelClasses: { [name: string]: { new (): IModel } } = {};
		registeredModules.forEach(module => {
			_.iterateObject(module.models, (key: string, value: { new (): IModel }) => {
				modelClasses[key] = value;
			});
		});
		const modelClass = modelClasses[modelType];
		if (_.exists(modelClass)) {
			return modelClass;
		} else {
			return undefined;
		}
	}

	private startApp(): void {
		const app: IModel = this.getCurrentModel();
		if (app) {
			if (this.options.wireApp) {
				this.context.wireBean(app);
			}
			app.start();
		} else {
			this.logger.log('No App to start');
		}
	}

	private getCurrentModel(): IModel {
		return this.context.getBean(Constants.DEFAULT_APP_ENTRY);
	}

	private dispatchReadyEvent(options: SrOptions): void {
		const eventService: EventService = this.context.getBean('eventService');
		const readyEvent: ReadyEvent = {
			type: Events.EVENT_READY,
			options,
		};
		eventService.dispatchEvent(readyEvent);
	}

	private registerModuleUserComponents(registeredModules: IModule[]): void {
		const userComponentRegistry: UserComponentRegistry = this.context.getBean('userComponentRegistry');

		const moduleUserComps: {
			componentName: string;
			componentClass: RegisteredComponentInput<IComponent<any>>;
		}[] = this.extractModuleEntity(registeredModules, module => (module.userComponents ? module.userComponents : []));

		moduleUserComps.forEach(compMeta => {
			userComponentRegistry.registerDefaultComponent(compMeta.componentName, compMeta.componentClass);
		});
	}

	public destroy(): void {
		if (this.destroyed) {
			// 已经销毁
			return;
		}
		this.destroyed = true;
		const app: IModel = this.getCurrentModel();
		if (app) {
			app.destroy();
		}
		// destroy the services
		this.context?.destroy();
	}
}
