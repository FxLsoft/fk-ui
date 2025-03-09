import { pop } from '../pop';
import SelectCluePop from './SelectCluePop.vue';
import type { SelectCluePopProps } from './interface';
/**
 * 选择线索
 * @param props { SelectCluePopProps }
 * @returns
 */
export function createSelectCluePop(props: SelectCluePopProps) {
	return pop.createPage(SelectCluePop, props);
}

export * from './interface';

export * from './api';
