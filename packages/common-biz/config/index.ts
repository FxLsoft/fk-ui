/**
 * 业务系统通用配置
 */

import { h } from 'vue';
import { merge } from 'lodash-es';
import { Button, IconSettings } from '@erp/common';
import { createColSettingsPop, pop, reqGetDynamicTableApi, reqSaveDynamicTableApi } from '../components';
import type { VxeGridProps } from '../types';

/**
 * vxe-grid-table 默认配置
 */
const DefaultGridProps: VxeGridProps = {
	border: false,
	stripe: false,
	loading: false,
	height: 500,
	loadingConfig: {
		text: '加载中...',
	},
	showOverflow: true,
	customConfig: {
		storage: true,
		// 获取配置缓存，需要配置id
		async restoreStore(params) {
			if (!params.id) {
				return params.storeData;
			}
			return reqGetDynamicTableApi(params.id).then(res => {
				return res.userFields || params.storeData;
			});
		},
		async updateStore(params) {
			if (!params.id) {
				return;
			}
			reqSaveDynamicTableApi(params.id, params.storeData).then(res => {
				pop.success('保存成功！');
			});
		},
	},
	columnConfig: {
		resizable: true,
		maxWidth: 360,
		isHover: true,
	},
	filterConfig: {
		iconMatch: 'erpfont icon-filter',
		iconNone: 'erpfont icon-filter',
	},
	rowConfig: {
		keyField: 'id',
		isHover: true,
		resizable: true,
		isCurrent: true,
	},
	scrollY: {
		enabled: true,
		gt: 20,
		oSize: 10,
	},
	scrollX: {
		enabled: true,
		gt: 0,
		oSize: 6,
	},
	pagerConfig: {
		showSelected: '已选择 {0} 条',
		current: 1,
		pageSize: 20,
		defaultPageSize: 20,
		total: 0,
		showTotal: true,
		showJumper: true,
		showPageSize: true,
		pageSizeOptions: [20, 50, 100, 200, 500],
		size: 'small',
	},
};

/**
 * 获取默认 grid 配置
 * @param gridProps
 * @returns
 */
export function mergeGridProps<T = any>(gridProps?: VxeGridProps<T>) {
	const props = merge({}, DefaultGridProps, gridProps);
	if (Array.isArray(props.columns) && props.id) {
		const seqColumn = props.columns.find(v => v.type === 'seq');
		if (seqColumn) {
			seqColumn.slots = {
				header(params) {
					return h(
						Button,
						{
							size: 'mini',
							shape: 'circle',
							onClick: () => {
								createColSettingsPop(params.$grid!);
							},
						},
						{
							icon: () => h(IconSettings),
						},
					);
				},
			};
		}
	}
	return props;
}
