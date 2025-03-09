<template>
	<VxeGrid ref="grid" class="config-table" v-bind="gridOptions">
		<template #operator="{ row, column }">
			<template v-if="hasEditStatus(row)">
				<Button size="mini" type="primary" @click="saveRowEvent(row, column)">保存</Button>
				<Button size="mini" type="secondary" @click="e => cancelRowEvent()">取消</Button>
			</template>
			<template v-else>
				<Button size="mini" type="outline" @click="editRowEvent(row)">编辑</Button>
			</template>
		</template>
	</VxeGrid>
</template>

<script setup lang="tsx">
import { onMounted, reactive, useTemplateRef } from 'vue';
import { VxeGrid, mergeGridProps, pop } from '@erp/biz';
import { Button } from '@erp/common';
import data from './data.json';
import type { VxeGridInstance } from '@erp/biz';

/**
 * 引用template模板
 */
const gridRef = useTemplateRef<VxeGridInstance>('grid');

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
			teleportTo: '.vxe-grid',
		},
		editConfig: {
			mode: 'row',
			trigger: 'manual',
		},
		columns: [
			{ field: 'checkbox', type: 'checkbox', width: 55, align: 'center', headerAlign: 'center', fixed: 'left' },
			{
				field: 'id',
				title: '内部订单号',
				sortable: true,
				editRender: {
					name: 'Input',
					props: {
						type: 'text',
						size: 'small',
						allowClear: false,
					},
				},
			},
			{
				field: 'order_status',
				title: '状态',
				width: 220,
				editRender: {
					name: 'Input',
					props: {
						type: 'text',
						size: 'small',
						allowClear: false,
					},
				},
			},
			{
				field: 'order_tags',
				title: '标记',
				filters: [
					{ label: 'Test2', value: 'Test2', checked: false },
					{ label: 'Test3', value: 'Test3', checked: false },
					{ label: 'Test4', value: 'Test4', checked: false },
					{ label: 'Test5', value: 'Test5', checked: false },
				],
			},
			{ field: 'order_time', title: '订单日期', width: 170 },
			{ field: 'pay_time', title: '付款时间', width: 170 },
			{ field: 'buyer_account', title: '买家账号+店铺' },
			{ field: 'meet', title: '应付+运费' },
			{ field: 'payment_fee', title: '已付金额', align: 'right' },
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
			{
				field: '#operator',
				title: '操作',
				fixed: 'right',
				/** 支持 slot */
				slots: { default: 'operator' },
				width: 140,
				canMouseSelected: false,
				className: 'cell-btns',
			},
		],
		data: [],
	}),
);

const handlePageData = () => {
	gridOptions.loading = true;
	setTimeout(() => {
		const list = data.data.list;
		gridOptions.data = list;
		gridOptions.loading = false;
		gridOptions.pagerConfig!.total = data.data.total;
	}, 500);
};

const hasEditStatus = row => {
	return gridRef.value?.isEditByRow(row);
};

const editRowEvent = row => {
	const editRecord = gridRef.value?.getEditRecord();
	if (editRecord) {
		pop.warning(`行【${editRecord.rowIndex + 1}】正在编辑，请先编辑完成`);
		return;
	}
	gridRef.value?.setEditRow(row);
};

const saveRowEvent = (row, column) => {
	gridRef.value?.forceClearEdit().then(() => {
		gridOptions.loading = true;
		setTimeout(() => {
			gridOptions.loading = false;
			pop.success(`保存成功！${JSON.stringify(row)}`);
		}, 300);
	});
};

const cancelRowEvent = () => {
	gridRef.value?.forceClearEdit(true);
};

onMounted(() => {
	handlePageData();
});
</script>
<style scoped lang="less">
.config-table {
	button + button {
		margin-left: 12px;
	}
}
</style>
