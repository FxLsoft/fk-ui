---
layout: page
---

# 带侧边栏带底部按钮

```vue { "component": true }
<template>
	<DynamicForm v-model="model" class="dynamic-form-demo" :config="formConfig" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { DynamicForm } from '@erp/biz';
import type { PageExpose } from '@erp/biz';

const model = reactive({});

const formConfig: DynamicFormI = {
	title: '商品订单',
	showSide: true,
	cols: 3,
	colGap: 12,
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
	groups: [
		{
			label: '基础信息',
			fields: [
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
					options: [
						{
							label: '张三',
							value: '1',
						},
					],
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
					key: 'key113',
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
		},
		{
			label: '收货信息',
			cols: 3,
			tip: '收货信息',
			fields: [
				{
					key: 'address',
					label: '收货人',
					type: 'text',
					placeholder: '请输入收货人姓名',
					required: true,
				},
				{
					key: 'phone',
					label: '联系人电话',
					type: 'text',
					required: true,
					tooltip: '请输入联系电话',
				},
				{
					key: 'key13',
					label: '智能解析',
					type: 'textarea',
				},
				{
					key: 'key115',
					label: '收货地址',
					type: 'cascader',
					required: true,
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
					key: 'key12',
					label: '详细地址',
					type: 'text',
					required: true,
					placeholder: '请输入具体街道/楼栋/房号等信息',
				},
				{
					key: 'key13',
					label: '使用代发地址',
					tooltip: '使用代发地址',
					type: 'switch',
					row: {
						wrap: false,
						align: 'end',
					},
					options: [
						{
							value: 1,
							label: '是',
						},
						{
							value: 2,
							label: '否',
						},
					],
				},
			],
		},
		{
			label: '商品信息',
			buttons: [
				{
					code: 'add-shop',
					label: '添加商品',
					type: 'text',
					status: 'normal',
					size: 'small',
				},
			],
		},
		{
			label: '卖家备注',
			fields: [
				{
					key: 'key111',
					label: '旗帜颜色',
					tooltip: '旗帜颜色',
					type: 'text',
					span: 2,
				},
				{
					key: 'key112',
					label: '定制内容',
					type: 'textarea',
					placeholder: '请输入需要定制的内容，最多不超过300字',
				},
				{
					key: 'key113',
					label: '备注',
					type: 'textarea',
					placeholder: '系统会根据您选择的商品+定制内容，自动生成备注',
				},
			],
		},
		{
			label: '加工信息',
			fields: [],
		},
		{
			label: '附件信息',
			fields: [
				{
					key: 'key123',
					type: 'upload',
					span: 2,
				},
			],
		},
	],
};

defineExpose<PageExpose>({
	getModel() {
		return model.value;
	},
});
</script>
<style lang="scss" scoped>
.dynamic-form-demo {
	padding: 0;
	border: 1px solid var(--color-border-1);
	border-radius: var(--border-radius-small);
	height: 560px;
}
</style>
```
