import { pop } from '../pop';
import BatchInputPop from './BatchInputPop.vue';
import type { BatchInputProps } from './interface';
/**
 * 创建批量输入框
 * @param props
 */
export function createBatchInputPop(props: BatchInputProps) {
	return pop.createModal(BatchInputPop, props, {
		title: `批量输入${props.bizName || ''}`,
	});
}
