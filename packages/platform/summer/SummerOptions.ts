import type { IModule } from './interfaces/IModule';
import type { RegisteredComponentInput } from './widgets/framework/userComponentRegistry';

/**
 * Summer 配置
 */
export interface SrOptions {
	// Debugger 模式
	debug?: boolean;
	// 启动 Model 类型
	modelType?: string;
	// 自定义 Component
	components?: { [key: string]: RegisteredComponentInput<any> };
	// 是否app自处理beans
	wireApp?: boolean;
}

/**
 * Summer 参数
 */
export interface SrParams {
	providedBeanInstances?: { [key: string]: any };
	modules?: IModule[];
	beanClasses?: any[];
}
