import type { VxeGridConstructor } from '../components/grid';
import type { VxeTableConstructor } from '../components/table';
import type { ButtonConfig } from './custom';

/**
 * 全局格式化
 */
export interface VxeGlobalCommands {
	mixin(opts: { [name: string]: VxeGlobalCommandsHandles.CommandsOptions | ((params: any, ...args: any[]) => void) }): VxeGlobalCommands;
	has(name: string): boolean;
	get(name: string): VxeGlobalCommandsHandles.CommandsOptions;
	add(name: string, options: VxeGlobalCommandsHandles.CommandsOptions | ((params: any, ...args: any[]) => void)): VxeGlobalCommands;
	delete(name: string): void;
	forEach(callback: (options: VxeGlobalCommandsHandles.CommandsOptions, name: string) => void): void;
}

export namespace VxeGlobalCommandsHandles {
	export interface CommandsOptions {
		/**
		 * 表格 - 自定义工具栏或数据代理的指令方法
		 */
		tableCommandMethod?: (params: TableCommandMethodParams, ...args: any[]) => void;
	}

	export interface TableCommandMethodParams {
		$grid: VxeGridConstructor | null;
		$table: VxeTableConstructor;
		button?: ButtonConfig | null;
		code?: string;
	}
}
