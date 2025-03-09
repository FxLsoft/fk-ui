<template>
	<Modal
		v-model:visible="visible"
		width="80%"
		class="select-goods-pop"
		:loading="loading"
		:title="props.title"
		@before-ok="handleBeforeOk"
		@cancel="handleCancel"
	>
		<FilterForm :model-value="searchModel" :config="searchConfig" @query="handleQuery" @reset="handleQuery" />
		<VxeGrid ref="gridRef" style="margin-top: 12px" v-bind="gridOptions" v-on="gridEvents">
			<template #image="{ row, column }">
				<Image v-if="row[column.field]" width="24" height="24" :src="row[column.field]?.path" />
			</template>
		</VxeGrid>
		<div class="select-wrapper">
			<div class="select-label">已选商品：</div>
			<VxeGrid v-bind="selectedGridOptions">
				<template #operator="{ rowIndex, column }">
					<Button v-for="el in column.params" :key="el.code" size="small" type="text" @click="handleButtonClick(el, rowIndex)">{{ el.label }}</Button>
				</template>
				<template #image="{ row, column }">
					<Image v-if="row[column.field]" width="24" height="24" :src="row[column.field]?.path" @click="row._previewVisible = true" />
				</template>
			</VxeGrid>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from 'vue';
import { Button, Image, Modal } from '@erp/common';
import { VxeGrid } from '../../grid-table';
import { FilterForm } from '..';
import { getGoodsListByCaseApi, getSupplierApi } from './api';
import type { SearchFormI } from '..';
import type { SelectGoodsPopProps } from './interface';
import type { VxeGridInstance, VxeGridListeners, VxeGridProps } from '@/grid-table/types';

const props = defineProps<SelectGoodsPopProps>();

const visible = ref(true);
const loading = ref(true);

const searchModel = reactive<Record<string, any>>({
	sex_code: [],
});

const searchConfig = reactive<SearchFormI>({
	gridProps: {
		cols: 3,
		colGap: 40,
		rowGap: 16,
	},
	fields: [
		{
			key: 'shape_code',
			label: '商品款号',
			type: 'text',
		},
		{
			key: 'product_name',
			label: '商品名称',
			type: 'text',
		},
		{
			key: 'supplier_ids',
			label: '供应商名称',
			type: 'select',
			multiple: true,
			options: [],
		},
		{
			key: 'category_ids',
			label: '商品分类',
			type: 'goods-category',
			multiple: true,
			placeholder: '请选择',
		},
		{
			key: 'sex_code',
			label: '男女款',
			type: 'dic',
			multiple: true,
			componentProps: {
				code: 'sex_code',
			},
		},
	],
});

const gridRef = ref<VxeGridInstance>();

const gridOptions = reactive<VxeGridProps>({
	border: false,
	stripe: false,
	loading: false,
	maxHeight: 400,
	loadingConfig: {
		text: '加载中...',
	},
	columnConfig: {
		resizable: true,
		maxWidth: 360,
		isHover: true,
	},
	rowConfig: {
		keyField: 'id',
		isHover: true,
		resizable: true,
		isCurrent: false,
	},
	checkboxConfig: {
		checkField: 'isChecked',
	},
	pagerConfig: {
		showSelected: '已选择 {0} 条',
		current: 1,
		pageSize: 10,
		total: 0,
		showTotal: true,
		showJumper: true,
		showPageSize: true,
		size: 'mini',
	},
	columns: [
		{ field: 'checkbox', type: 'checkbox', width: 55, align: 'center', headerAlign: 'center' },
		{
			type: 'seq',
			title: '#',
			width: 55,
		},
		{
			field: 'product_default_pic',
			title: '商品主图',
			align: 'center',
			slots: {
				default: 'image',
			},
		},
		{ field: 'shape_code', title: '商品款号' },
		{ field: 'product_name', title: '商品名称' },
		{
			field: 'product_supplier',
			title: '供应商',
			formatter(params) {
				return params.cellValue?.[0]?.supplier?.name;
			},
		},
		{
			field: 'category',
			title: '商品分类',
			formatter(params) {
				return params.cellValue?.category_name;
			},
		},
	],
	data: [],
});

const gridCheckChange = () => {
	const allData = gridOptions.data || [];
	const checkedRows = gridRef.value.getCheckboxRecords();
	allData.forEach(el => {
		const beforeSelectedIndex = selectedGridOptions.data.findIndex(v => v.id == el.id);
		const afterSelectedIndex = checkedRows.findIndex(v => v.id == el.id);
		if (beforeSelectedIndex > -1) {
			if (afterSelectedIndex === -1) {
				selectedGridOptions.data.splice(beforeSelectedIndex, 1);
			}
		} else {
			if (afterSelectedIndex > -1) {
				selectedGridOptions.data.push(checkedRows[afterSelectedIndex]);
			}
		}
	});
};

const handleButtonClick = (btn, rowIndex) => {
	if (btn.code === 'delete') {
		selectedGridOptions.data.splice(rowIndex, 1);
		refreshCheckbox();
	}
};

const refreshCheckbox = () => {
	gridOptions.data.forEach(row => {
		const find = selectedGridOptions.data.find(v => v.id == row.id);
		if (find) {
			gridRef.value.setCheckboxRow(row, true);
		} else {
			gridRef.value.setCheckboxRow(row, false);
		}
	});
};

const gridEvents: VxeGridListeners = {
	currentChange(params) {
		gridCheckChange();
	},
	checkboxChange(params) {
		gridCheckChange();
	},
	checkboxAll(params) {
		gridCheckChange();
	},
	pageChange(params) {
		gridOptions.pagerConfig!.current = params.current;
		gridOptions.pagerConfig!.pageSize = params.pageSize;
		query();
	},
};

const selectedGridOptions = reactive<VxeGridProps>({
	border: false,
	stripe: false,
	loading: false,
	maxHeight: 400,
	loadingConfig: {
		text: '加载中...',
	},
	columnConfig: {
		resizable: true,
		maxWidth: 360,
		isHover: true,
	},
	rowConfig: {
		keyField: 'id',
		isHover: true,
		resizable: true,
		isCurrent: true,
	},
	pagerConfig: null,
	columns: [
		{
			type: 'seq',
			title: '#',
			width: 55,
		},
		{
			field: 'product_default_pic',
			title: '商品主图',
			align: 'center',
			slots: {
				default: 'image',
			},
		},
		{ field: 'shape_code', title: '商品款号' },
		{ field: 'product_name', title: '商品名称' },
		{
			field: 'product_supplier',
			title: '供应商',
			formatter(params) {
				return params.cellValue?.[0]?.supplier?.name;
			},
		},
		{
			field: 'category',
			title: '商品分类',
			formatter(params) {
				return params.cellValue?.category_name;
			},
		},
		{
			field: '#operator',
			title: '操作',
			fixed: 'right',
			slots: { default: 'operator' },
			canMouseSelected: false,
			className: 'cell-btns',
			params: [
				{
					code: 'delete',
					label: '删除',
				},
			],
		},
	],
	data: [],
});

const handleCancel = () => {
	visible.value = false;
};

const handleBeforeOk = done => {
	done(toRaw(selectedGridOptions.data));
};

const query = () => {
	gridOptions.loading = true;
	const params = {
		case_id: props.case_id,
		...searchModel,
		page: gridOptions.pagerConfig.current,
		page_size: gridOptions.pagerConfig.pageSize,
	};
	getGoodsListByCaseApi(params)
		.then(res => {
			gridOptions.data = res.list || [];
			gridOptions.pagerConfig.total = res.total;
		})
		.finally(() => {
			gridOptions.loading = false;
			refreshCheckbox();
		});
};

const handleQuery = () => {
	gridOptions.pagerConfig.current = 1;
	query();
};

const init = () => {
	query();
	getSupplierApi({}).then(res => {
		searchConfig.fields.find(v => v.key === 'supplier_ids').options = res || [];
	});
};

onMounted(() => {
	init();
});
</script>

<style lang="scss">
.select-goods-pop {
	.select-label {
		margin: 24px 0 12px;
	}
}
</style>
