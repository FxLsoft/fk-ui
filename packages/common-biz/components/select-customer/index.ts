import { pop } from '../pop';
import SelectCustomerPop from './SelectCustomerPop.vue';
import AddCustomerPop from './AddCustomerPop.vue';
import type { AddCustomerProps, SelectCustomerPopProps } from './interface';

/**
 * 选择客户
 * @param props { SelectCustomerPopProps }
 * @returns
 */
export function createSelectCustomerPop(props: SelectCustomerPopProps) {
	return pop.createPage(SelectCustomerPop, props);
}

/**
 * 添加/编辑客户
 * @param props
 * @returns
 */
export function createAddCustomerPop(props: AddCustomerProps) {
	return pop.createModal(AddCustomerPop, props, {
		width: '60%',
		title: props.bizType === 'edit' ? '编辑客户' : '添加客户',
	});
}

export * from './interface';

export * from './api';
