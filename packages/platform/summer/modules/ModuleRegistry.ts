import { _ } from '../utils';
import type { IModule, IProxyModule } from '../interfaces/IModule';
/**
 * 模块注册以及对模块进行处理，维护。
 */
export class ModuleRegistry {
	private static modulesMap: { [name: string]: IModule } = {};
	private static asyncModulesMap: { [name: string]: IProxyModule } = {};

	public static register(module: IModule): void {
		ModuleRegistry.modulesMap[module.moduleName] = module;
	}

	// 批量注册模块
	public static registerModules(modules: IModule[]): void {
		if (!modules) {
			return;
		}
		modules.forEach(ModuleRegistry.register);
	}

	public static isRegistered(moduleName: string): boolean {
		return !!ModuleRegistry.modulesMap[moduleName];
	}

	public static getRegisteredModules(): IModule[] {
		return _.values(ModuleRegistry.modulesMap);
	}

	public static registerAsync(proxyModule: IProxyModule): void {
		ModuleRegistry.asyncModulesMap[proxyModule.moduleName] = proxyModule;
	}

	public static registerAsyncModules(proxyModules: IProxyModule[]): void {
		if (!proxyModules) {
			return;
		}
		proxyModules.forEach(ModuleRegistry.registerAsync);
	}

	public static isRegisteredAsync(moduleName: string): boolean {
		return !!ModuleRegistry.asyncModulesMap[moduleName];
	}

	public static registerAsyncByModuleName(moduleName: string): Promise<IModule> {
		return new Promise<IModule>((resolve, reject) => {
			const proxyModule = ModuleRegistry.asyncModulesMap[moduleName];
			if (proxyModule) {
				proxyModule.proxy().then((module: IModule) => {
					delete ModuleRegistry.asyncModulesMap[moduleName];
					ModuleRegistry.register(module);
					resolve(module);
				});
			} else {
				reject();
			}
		});
	}
}
