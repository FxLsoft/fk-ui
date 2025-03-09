import GoodsGrid from './goods-grid.vue';
import type { DynamicFormI } from '@erp/biz';

export const config: DynamicFormI = {
	title: '商品订单',
	showSide: true,
	// 这个按钮配置需要考虑 modal / drawer，此配置与该组件的buttons配置重复
	buttons: [
		{
			label: '提交',
			code: 'submit',
			type: 'primary',
			validator: 'field',
		},
		{
			label: '取消',
			code: 'cancel',
			type: 'info',
		},
	],
	cols: 3,
	colGap: 12,
	components: {
		GoodsGrid,
	},
	fields: [
		{
			key: 'address',
			label: '地市',
			type: 'cascader',
			componentProps: {
				pathMode: true,
			},
			options: [
				{
					value: 'beijing',
					label: 'Beijing',
					children: [
						{
							value: 'chaoyang',
							label: 'ChaoYang',
							children: [
								{
									value: 'datunli',
									label: 'Datunli',
								},
							],
						},
						{
							value: 'haidian',
							label: 'Haidian',
						},
						{
							value: 'dongcheng',
							label: 'Dongcheng',
						},
						{
							value: 'xicheng',
							label: 'Xicheng',
							children: [
								{
									value: 'jinrongjie',
									label: 'Jinrongjie',
								},
								{
									value: 'tianqiao',
									label: 'Tianqiao',
								},
							],
						},
					],
				},
				{
					value: 'shanghai',
					label: 'Shanghai',
					children: [
						{
							value: 'huangpu',
							label: 'Huangpu',
						},
					],
				},
			],
		},
		{
			key: 'orderType',
			label: '订单类型',
			type: 'select',
			required: true,
			options: [
				{
					value: '1',
					label: '订单类型一',
				},
			],
		},
		{
			key: 'key2.key',
			label: '店铺',
			required: true,
			type: 'select',
			options: [
				{
					value: 1,
					label: '店铺一',
				},
			],
		},
		{
			key: 'key3',
			label: '下单时间',
			type: 'date',
		},
		{
			key: 'key4',
			label: '运费',
			type: 'number',
		},
		{
			key: 'key5',
			label: '买家账号',
			type: 'text',
			required: true,
		},
		{
			key: 'key6',
			label: '买家名称',
			type: 'text',
			required: true,
		},
		{
			key: 'key7',
			label: '业务员',
			type: 'select',
			required: true,
			options: [],
		},
		{
			key: 'key8',
			label: '商机编号',
			type: 'text',
		},
		{
			key: 'key9',
			label: '经销商',
			type: 'text',
		},
		{
			key: 'key10',
			label: '派单人员',
			type: 'select',
			options: [],
		},
		{
			key: 'key11',
			label: '归属手机',
			type: 'text',
			rules: {
				type: 'string',
				validator(value, callback) {
					// 校验手机
					callback();
				},
			},
		},
	],
};
