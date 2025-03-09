import type { VxeGridConstructor, VxeGridPrivateMethods, VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods } from '..';

export namespace VxeGlobalHooksHandles {
	export interface HookOptions {}
}

export interface VxeGlobalHooks {
	mixin(options: { [type: string]: VxeGlobalHooksHandles.HookOptions }): VxeGlobalHooks;
	has(type: string): boolean;
	get(type: string): VxeGlobalHooksHandles.HookOptions;
	add(type: string, options: VxeGlobalHooksHandles.HookOptions): VxeGlobalHooks;
	delete(type: string): void;
	forEach(callback: (options: VxeGlobalHooksHandles.HookOptions, type: string) => void): void;
}

export namespace VxeGlobalHooksHandles {
	export interface HookOptions {
		setupTable?($table: VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods<any>): void | Record<string, any>;
		setupGrid?($grid: VxeGridConstructor & VxeGridPrivateMethods): void | Record<string, any>;
	}
}
