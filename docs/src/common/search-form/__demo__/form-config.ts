import type { SearchFormI } from '@erp/biz';

export const config: SearchFormI = {
	gridProps: {
		cols: 3,
		colGap: 12,
		rowGap: 16,
	},
	fields: [
		{
			key: 'key1',
			type: 'text',
			tooltip: '商品名称',
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
			key: 'key4',
			label: '男女款',
			type: 'checkbox',
			multiple: true,
			options: [
				{
					label: '男女款',
					value: 1,
				},
				{
					label: '男女款',
					value: 2,
				},
				{
					label: '男女款',
					value: 3,
				},
				{
					label: '男女款',
					value: 4,
				},
				{
					label: '男女款',
					value: 5,
				},
				{
					label: '男女款',
					value: 6,
				},
			],
		},
		{
			key: 'key41',
			label: '男女款',
			type: 'radio',
			multiple: true,
			showExpand: true,
			options: [
				{
					label: '男女款',
					value: 1,
				},
				{
					label: '男女款',
					value: 2,
				},
				{
					label: '男女款',
					value: 3,
				},
				{
					label: '男女款',
					value: 4,
				},
				{
					label: '男女款',
					value: 5,
				},
				{
					label: '男女款',
					value: 6,
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
			key: 'key7',
			label: '商品状态',
			type: 'checkbox',
			multiple: true,
			options: [
				{
					label: '男女款',
					value: 1,
				},
				{
					label: '男女款',
					value: 2,
				},
				{
					label: '男女款',
					value: 3,
				},
				{
					label: '男女款',
					value: 4,
				},
				{
					label: '男女款',
					value: 5,
				},
				{
					label: '男女款',
					value: 6,
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
			placeholder: ['开始时间', '结束时间'],
			componentProps: {
				format: 'YYYY/MM/DD',
			},
		},
		{
			key: 'custom',
			label: '自定义',
			type: 'custom',
			component: 'custom',
			options: [],
			showExpand: true,
		},
	],
};
