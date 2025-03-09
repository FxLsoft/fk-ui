import type { ComponentMeta } from '../context/Context';
import type { RegisteredComponentInput } from '../widgets/framework/userComponentRegistry';
import type { IComponent } from '../interfaces/IComponent';
import type { IModel } from '../interfaces/IModel';

export interface IModule {
	moduleName: string;
	beans?: any[];
	stackComponents?: ComponentMeta[];
	userComponents?: { componentName: string; componentClass: RegisteredComponentInput<IComponent<any>> }[];
	models?: { [name: string]: { new (): IModel } };
	dependantModules?: IModule[];
}
/**
 * Async IModule
 */
export interface IProxyModule {
	moduleName: string;
	proxy: () => Promise<IModule>;
}
