import { getIndustryOptionsApi } from '@erp/biz';
import type { SearchFormI } from '@erp/biz';

export const config: SearchFormI = {
	gridProps: {
		cols: {
			xxl: 3,
			xl: 2,
			lg: 2,
			md: 2,
			sm: 2,
			xs: 2,
		},
		colGap: 12,
		rowGap: 12,
	},
	fields: [
		{
			key: 'rangeNumber',
			label: '价格',
			type: 'range-number',
			placeholder: ['最低价', '最高价'],
		},
		{
			key: 'key1',
			label: '商品名称',
			type: 'text',
			tooltip: '商品名称',
			componentProps: {
				allowClear: true,
				onFocus: evt => {
					console.log(' onFocusevt >>');
				},
				onClear(evt) {
					console.log('onClear evt >>');
				},
			},
		},
		{
			key: 'customer_industry_id',
			label: '客户行业',
			type: 'tree',
			options: () => getIndustryOptionsApi(),
			componentProps: {
				selectable: 'leaf',
				treeProps: {
					defaultExpandAll: false,
					virtualListProps: {
						height: 200,
					},
				},
			},
		},
		{
			key: 'key2',
			label: '商品编码',
			type: 'text',
		},
		{
			key: 'key3',
			label: '商品分类',
			type: 'select',
			options: [
				{
					value: '1',
					label: '分类一',
				},
			],
		},
		{
			key: 'key5',
			label: '供应商',
			type: 'select',
			options: [
				{
					label: '供应商一',
					value: 1,
				},
			],
		},
		{
			key: 'key8',
			label: '商品标签',
			type: 'select',
			options: [
				{
					label: '供应商一',
					value: 1,
				},
			],
		},
		{
			key: 'key10',
			label: '创建时间',
			type: 'date',
			multiple: true,
			componentProps: {
				format: 'YYYY/MM/DD',
			},
		},
		{
			key: 'key11',
			label: '创建时间',
			type: 'date',
			multiple: true,
			componentProps: {
				format: 'YYYY/MM/DD',
			},
		},
		{
			key: 'custom',
			label: '自定义',
			type: 'custom',
			component: props => {
				console.log('custom props>>', props);
				return <div style="white-space: wrap">{props.field}</div>;
			},
		},
	],
};
