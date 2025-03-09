import { reactive } from 'vue';
import type { DynamicFormFieldI, DynamicFormGroupI, DynamicFormI } from './interface';

let id = 0;

export function getId(flag?: string) {
	return `${flag}_${++id}`;
}

/**
 * 格式化表单配置
 */
export function formatDynamicForm(vm: Partial<DynamicFormI>) {
	vm.$id = vm.$id || getId('form');
	vm.showSide = vm.showSide ?? true;
	vm.cols = vm.cols ?? 1;
	vm.colGap = vm.colGap ?? 16;
	vm.layout = vm.layout ?? 'vertical';
	if (vm.layout === 'horizontal') {
		vm.labelAlign = 'right';
	} else {
		vm.labelAlign = 'left';
	}
	vm.fields = (vm.fields || []).map(field => {
		return formatFormField(field);
	});
	(vm.groups || []).forEach(group => {
		formatFormGroup(group);
	});
	return vm;
}

function formatFormGroup(vm: Partial<DynamicFormGroupI>) {
	vm.$id = vm.$id || getId('group');
	vm.cols = vm.cols ?? 2;
	vm.colGap = vm.colGap ?? 16;
	vm.fields = (vm.fields || []).map(field => {
		return formatFormField(field);
	});
	return vm;
}

/**
 * 表单字段配置
 */
function formatFormField(vm: DynamicFormFieldI): DynamicFormFieldI {
	vm.$id = vm.$id || getId('field');
	return reactive(vm);
}
