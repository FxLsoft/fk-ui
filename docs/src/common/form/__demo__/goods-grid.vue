<template>
	<VxeGrid class="goods-grid" v-bind="gridOptions">
		<template #key1="{ row, column }">
			<div class="goods-name">
				<span>{{ row[column.field] }}</span>
				<Input v-model="row.key11" type="textarea" />
				<div class="footer">
					<FkButton size="mini" type="text">添加备注</FkButton>
					<FkButton size="mini" type="text">批量改价</FkButton>
				</div>
			</div>
		</template>
		<template #key5="{ row, column }">
			<Input v-model="row[column.field]" type="number" @change="handleChange(row, column)" />
		</template>
		<template #key6="{ row, column }">
			<Input v-model="row[column.field]" type="integer" @change="handleChange(row, column)" />
		</template>
		<template #key7="{ row, column }">
			<Input
				v-model="row[column.field]"
				type="switch"
				:options="[
					{ value: 1, label: '是' },
					{ value: 2, label: '否' },
				]"
			/>
		</template>
		<template #operator="{ row, column }">
			<FkButton size="small" type="text" status="danger">
				<IconDelete #icon />
			</FkButton>
		</template>
		<template #bottom="{ grid }">
			<div class="table-footer">
				<span class="item"
					><span class="label">总件数:</span><span class="value">{{ total }} 件</span></span
				>
				<span class="item"><span class="label">整体优惠</span><Input style="width: 120px" type="number" /></span>
				<span class="item"><span class="label">总金额</span><Input style="width: 120px" type="number" /></span>
			</div>
		</template>
	</VxeGrid>
</template>

<script setup lang="tsx">
import { computed, reactive } from 'vue';
import { VxeGrid } from '@erp/biz/grid-table';
import { Input, pop } from '@erp/biz';
import { UPDATE_MODEL } from '@erp/biz/utils/constants';
import { IconDelete } from '@erp/common/components/icon';
import type { DynamicFieldComponentExpose, DynamicFieldComponentProps, VxeGridProps } from '@erp/biz';

const props = defineProps<DynamicFieldComponentProps>();

const emit = defineEmits([UPDATE_MODEL]);

const handleChange = (row, field) => {
	row.key8 = row.key5 * row.key6;
};

const total = computed(() => {
	return gridOptions.data
		.reduce((pre, cur) => {
			return pre + +cur.key6;
		}, 0)
		.toFixed(0);
});

const gridOptions = reactive<VxeGridProps>({
	loading: true,
	height: 420,
	stripe: false,
	columnConfig: {
		resizable: true,
		minWidth: 120,
		maxWidth: 360,
	},
	rowConfig: {
		isHover: true,
		resizable: true,
		isCurrent: true,
	},
	// showFooter: true,
	// footerSpanMethod({ column }) {
	// 	return {
	// 		rowspan: 1,
	// 		colspan: 1
	// 	}
	// },
	// footerMethod(params) {
	// 	return [{
	// 		total: 100,
	// 	}]
	// },
	columns: [
		{
			field: 'key1',
			title: '商品名',
			width: 280,
			className: 'cell-border',
			slots: {
				default: 'key1',
			},
		},
		{
			field: 'seq',
			type: 'seq',
			title: '#',
			width: 55,
			align: 'center',
			headerAlign: 'center',
		},
		{
			field: 'key2',
			title: '颜色',
		},
		{
			field: 'key3',
			title: '尺码',
		},
		{
			field: 'key4',
			title: '原价(元)',
		},
		{
			field: 'key5',
			title: '售价(元)',
			className: 'cell-input',
			slots: {
				default: 'key5',
			},
		},
		{
			field: 'key6',
			title: '数量',
			className: 'cell-input',
			slots: {
				default: 'key6',
			},
		},
		{
			field: 'key7',
			title: '是否赠品',
			slots: {
				default: 'key7',
			},
		},
		{
			field: 'key8',
			title: '小计(元)',
		},
		{
			field: 'key9',
			title: '排序',
		},
		{
			field: '#operator',
			title: '操作',
			fixed: 'right',
			slots: { default: 'operator' },
			canMouseSelected: false,
			className: 'cell-btns',
			align: 'center',
			width: 60,
		},
	],
	data: [],
});
const queryData = () => {
	gridOptions.loading = false;
	const data = [];
	for (let i = 0; i < 10; i++) {
		const item = {};
		for (let k = 1; k <= 10; k++) {
			item[`key${k}`] = (Math.random() * 1000).toFixed(2);
		}
		data.push(item);
	}
	gridOptions.data = data;
	gridOptions.mergeCells = [{ row: 0, col: 0, rowspan: 3, colspan: 1 }];
	// emit(UPDATE_MODEL, data);
};

defineExpose<DynamicFieldComponentExpose>({
	async validate() {
		pop.success('校验成功');
		return true;
	},
});

setTimeout(() => {
	queryData();
}, 500);
</script>

<style lang="scss" scoped>
.goods-grid {
	width: 100%;

	.cell-border {
		border-right: 1px solid var(--color-border-2);
	}

	.cell-input {
		.vxe-cell {
			padding: 0 2px;
		}
	}

	.cell-btns {
		.vxe-cell {
			padding: 0;
		}

		button + button {
			margin-left: -12px;
		}
	}

	.table-footer {
		padding: 12px;
		background: var(--color-fill-2);
		width: 100%;
		display: inline-flex;
		justify-content: flex-end;
		align-items: center;
		border-left: 1px solid var(--color-border-2);
		border-right: 1px solid var(--color-border-2);
		border-bottom: 1px solid var(--color-border-2);

		.item {
			display: inline-flex;
			align-items: center;
		}

		.item + .item {
			margin-left: 24px;
		}

		.label {
			margin-right: 8px;
		}

		.value {
			color: var(--color-text-1);
			font-weight: 500;
		}
	}
}
</style>
