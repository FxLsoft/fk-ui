<template>
	<VxeGrid ref="grid" class="config-table" v-bind="gridOptions" v-on="gridEvents" />
</template>

<script setup lang="tsx">
import { onMounted, reactive, ref, useTemplateRef } from 'vue';
import { VxeGrid, mergeGridProps } from '@erp/biz';
import { clipboard } from '@erp/common';
import data from './data.json';
import type { VxeGridInstance, VxeGridListeners } from '@erp/biz';

/**
 * 引用template模板
 */
const gridRef = useTemplateRef<VxeGridInstance>('grid');
const options = [];
/**
 * 表格 grid 配置
 */
const gridOptions = reactive(
	mergeGridProps({
		height: 360,
		columnConfig: {
			width: 160,
		},
		filterConfig: {
			mode: 'header',
		},
		columns: [
			{ field: 'checkbox', type: 'checkbox', width: 55, align: 'center', headerAlign: 'center', fixed: 'left' },
			{
				type: 'seq',
				title: '#',
				width: 55,
				align: 'center',
				headerAlign: 'center',
				fixed: 'left',
			},
			{
				field: 'id',
				title: '内部订单号',
				sortable: true,
				filterRender: {
					name: 'Input',
					compareOperator: 'in',
					props: {
						type: 'select',
					},
				},
				// filterMethod(params) {
				// 	console.log(params);
				// 	return true;
				// },
			},
			{
				field: 'payment_fee',
				title: '已付金额',
				align: 'right',
				filterRender: {
					name: 'Input',
					compareOperator: 'between',
					props: {
						type: 'range-number',
						precision: 2,
						hideButton: true,
					},
					// cellType: 'date',
				},
			},
			{
				field: 'order_status',
				title: '状态',
				width: 220,
			},
			{
				field: 'order_tags',
				title: '标记',
			},
			{
				field: 'order_time',
				title: '订单日期',
				width: 180,
				filterRender: {
					name: 'Input',
					compareOperator: 'between',
					props: {
						type: 'datetime',
					},
					// cellType: 'date',
				},
			},
			{ field: 'pay_time', title: '付款时间', width: 170 },
			{
				field: 'buyer_account',
				title: '买家账号+店铺',
				filterRender: {
					name: 'Input',
					compareOperator: 'include',
					props: {
						type: 'text',
					},
					// cellType: 'date',
				},
			},
			{ field: 'meet', title: '应付+运费' },

			{ field: 'remaining_amount', title: '剩余支付金额' },

			{ field: 'client_remark', title: '客户留言' },
			{ field: 'customer_notes', title: '卖家备注' },
			{ field: 'offline_remark', title: '线下备注' },
			{ field: 'expresses', title: '快递公司' },
			{ field: 'receiver_address', title: '收货地址' },
			{ field: 'plan_ship_time', title: '计划发货日期' },
			{ field: 'order_sale', title: '业务员' },
			{ field: 'confirm_time', title: '确认收货时间' },
			{ field: 'remaining_delivery_time', title: '剩余发货时间' },
			{ field: 'order_source', title: '订单来源' },
		],
		data: [],
	}),
);

/**
 * 监听 grid 事件
 */
const gridEvents: VxeGridListeners = {
	pageChange({ pageSize, current }) {
		gridOptions.pagerConfig!.current = current;
		gridOptions.pagerConfig!.pageSize = pageSize;
		handlePageData();
		console.log('pageChange >>', pageSize, current);
	},
	toolbarButtonClick(event) {
		console.log('toolbarButtonClick >>', event);
	},
	toolbarToolClick(event) {
		console.log('toolbarFoolClick >>', event);
	},
	currentChange(event) {
		console.log('currentChange >>', event);
	},
	menuClick(event) {
		console.log('menuClick >>', event);
	},
	copy(event) {
		// console.log('event >>', event);
		// debugger;
		// clipboard(JSON.stringify(event.row));
	},
	sortChange(params) {
		console.log('sortChange >>', params);
	},
};

const handlePageData = () => {
	gridOptions.loading = true;
	setTimeout(() => {
		const list = data.data.list;
		gridOptions.data = list;
		gridOptions.loading = false;
		gridOptions.pagerConfig!.total = data.data.total;
		list.forEach(el => {
			options.push({
				label: String(el.id),
				value: el.id,
			});
		});
		/**
		 * 设置数据源
		 */
		gridRef.value.setFilter('id', options);
		// selectProps.options = options;
	}, 500);
};

onMounted(() => {
	handlePageData();
});
</script>

<style scoped lang="less">
.config-table {
	:deep(.cell-btns) {
		button + button {
			margin-left: -12px;
		}
	}
}
</style>
