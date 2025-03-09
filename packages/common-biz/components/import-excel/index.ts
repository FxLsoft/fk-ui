import { pop } from '../pop';
import _Component from './ImportExcel.vue';
import type { ImportExcelProps } from './interface';

import './style.less';

/**
 * 批量导入
 * @param props
 * @returns
 */
export function createImportExcelPop(props: ImportExcelProps) {
	return pop.createModal(_Component, props, {
		title: `批量导入${props.bizName || ''}`,
		width: 480,
	});
}
