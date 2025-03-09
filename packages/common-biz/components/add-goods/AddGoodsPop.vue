<template>
	<Modal
		v-model:visible="visible"
		width="80%"
		class="add-goods-pop"
		:loading="loading"
		:title="props.title || '添加商品'"
		@before-ok="handleBeforeOk"
		@cancel="handleCancel"
	>
		<Input
			v-model="searchState.id"
			type="select"
			placeholder="请输入商品名称或款号"
			:loading="searchState.loading"
			:options="searchState.options"
			:virtual-list-props="{ height: '200px' }"
			@search="handleSearch"
			@change="handleChange"
		/>
		<VxeGrid ref="gridRef" style="margin-top: 12px" v-bind="gridOptions">
			<template #integer="{ row, column }">
				<Input
					:model-value="getCount(row[column.field])"
					type="integer"
					:disabled="!row[column.field]"
					:allow-clear="false"
					@update:model-value="value => setCount(row[column.field], value)"
					@blur="handlerBlur(row, row[column.field])"
				/>
			</template>
		</VxeGrid>
		<div class="select-wrapper">
			<div class="select-label">已选商品：</div>
			<VxeGrid ref="selectedGridRef" v-bind="selectedGridOptions">
				<template #operator="{ rowIndex, column }">
					<Button v-for="el in column.params" :key="el.code" size="small" type="text" @click="handleButtonClick(el, rowIndex)">{{ el.label }}</Button>
				</template>
			</VxeGrid>
		</div>
	</Modal>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRaw } from 'vue';
import { Button, Modal } from '@erp/common';
import { VxeGrid } from '../../grid-table';
import Input from '../input';
import { queryProductSKUApi, queryProductsApi, querySKUPriceApi } from './api';
import type { OptionData } from '../input';
import type { AddGoodsPopProps } from './interface';
import type { VxeGridInstance, VxeGridPropTypes, VxeGridProps } from '../../grid-table/types';

const props = defineProps<AddGoodsPopProps>();

const visible = ref(true);
const loading = ref(true);

const searchState = reactive({
	loading: false,
	id: '',
	options: [] as OptionData[],
});

/**
 * 商品搜索
 * @param value
 */
const handleSearch = value => {
	if (value) {
		searchState.loading = true;
		queryProductsApi(value)
			.then(res => {
				searchState.options = (res || []).map(v => {
					return {
						label: v.product_name,
						value: v.product_id,
					};
				});
			})
			.finally(() => {
				searchState.loading = false;
			});
	} else {
		searchState.options = [];
	}
};

const colorSizeMap = reactive(new Map<number, number>());
const getCount = (skuId: number) => {
	return colorSizeMap.get(+skuId);
};
const setCount = (skuId: number, value) => {
	colorSizeMap.set(+skuId, value);
};

const handleChange = productId => {
	if (productId) {
		gridOptions.loading = true;
		queryProductSKUApi(productId)
			.then(res => {
				const list = res.list || [];
				gridOptions.columns = [];
				gridOptions.data = [];
				list.forEach(el => {
					const find = gridOptions.data.find(v => v.color_id === el.color_id);
					const sizeColumnKey = `size_${[el.size_id]}`;
					if (!find) {
						gridOptions.data.push({
							id: el.id,
							product_id: el.product_id,
							color_id: el.color_id,
							color_name: el.color_name,
							price: el.price,
							[sizeColumnKey]: el.id,
						});
					} else {
						find[sizeColumnKey] = el.id;
					}
					const hasColumn = gridOptions.columns.find(v => v.field === sizeColumnKey);
					if (!hasColumn) {
						gridOptions.columns.push({
							title: el.size_name,
							field: sizeColumnKey,
							slots: {
								default: 'integer',
							},
						});
					}
				});
				if (list.length > 0) {
					gridOptions.columns.unshift(ColorColumn);
				}
			})
			.finally(() => {
				gridOptions.loading = false;
			});
	} else {
		gridOptions.columns = [];
		gridOptions.data = [];
	}
};

const handlerBlur = (row: any, skuId: number) => {
	const count = getCount(skuId);
	if (count > 0) {
		const find = selectedGridOptions.data.find(v => v.product_sku_id === skuId);
		if (find) {
			find.product_amount = count;
			formatRow(find);
			return;
		}
		const params = {
			product_sku_id: skuId,
			product_amount: count,
			price: row.price,
		};
		selectedGridOptions.loading = true;
		querySKUPriceApi(params)
			.then(res => {
				if (res) {
					res.price = +res.price;
					formatRow(res);
					selectedGridOptions.data.push(res);
				}
			})
			.finally(() => {
				selectedGridOptions.loading = false;
			});
	}
};

const gridRef = ref<VxeGridInstance>();
const ColorColumn: VxeGridPropTypes.Column = {
	field: 'color_name',
	title: '颜色',
	align: 'center',
};
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
	columns: [],
	data: [],
});

const handleButtonClick = (btn, rowIndex) => {
	if (btn.code === 'delete') {
		colorSizeMap.delete(selectedGridOptions.data[rowIndex].product_sku_id);
		selectedGridOptions.data.splice(rowIndex, 1);
	}
};
const selectedGridRef = ref<VxeGridInstance>();
const selectedGridOptions = reactive<VxeGridProps>({
	border: false,
	stripe: false,
	loading: false,
	maxHeight: 400,
	minHeight: undefined,
	showOverflow: true,
	loadingConfig: {
		text: '加载中...',
	},
	columnConfig: {
		resizable: true,
		maxWidth: 360,
		isHover: true,
	},
	editConfig: {
		trigger: 'click',
		mode: 'cell',
	},
	rowConfig: {
		keyField: 'product_sku_id',
		isHover: true,
		resizable: true,
		isCurrent: true,
	},
	pagerConfig: null,
	showFooter: true,
	footerMethod(params) {
		return [
			{
				seq: '合计',
				product_amount: params.data.reduce((pre, cru) => Number(cru.product_amount || 0) + pre, 0).toFixed(0),
				sub_total_price: params.data.reduce((pre, cru) => Number(cru.sub_total_price || 0) + pre, 0).toFixed(2),
			},
		];
	},
	columns: [
		{
			type: 'seq',
			field: 'seq',
			title: '#',
			width: 55,
		},
		{
			field: 'product_name',
			title: '商品名称',
		},
		{ field: 'shape_code', title: '商品款号' },
		{ field: 'color', title: '颜色' },
		{
			field: 'size',
			title: '尺码',
		},
		{
			field: 'product_amount',
			title: '数量',
			editRender: {
				name: 'Input',
				props: {
					type: 'integer',
					size: 'small',
					allowClear: false,
				},
				events: {
					change({ row }, value) {
						setCount(row.product_sku_id, value);
						formatRow(row);
					},
				},
			},
		},
		{
			field: 'price',
			title: '单价',
			formatter({ cellValue }) {
				return (+cellValue || 0).toFixed(2);
			},
			editRender: {
				name: 'Input',
				props: {
					type: 'number',
					min: 0,
					precision: 2,
					size: 'small',
					allowClear: false,
				},
				events: {
					change({ row }) {
						formatRow(row);
					},
				},
			},
		},
		{
			field: 'original_price',
			title: '原价',
		},
		{
			field: 'sub_total_price',
			title: '金额',
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

const formatRow = (row: any) => {
	row.sub_total_price = Number(getCount(row.product_sku_id) * Number(row.price)).toFixed(2);
	nextTick(() => {
		selectedGridRef.value?.reloadData(selectedGridOptions.data);
	});
};

const handleCancel = () => {
	visible.value = false;
};

const handleBeforeOk = () => {
	return toRaw(selectedGridOptions.data);
};

const init = () => {};

onMounted(() => {
	init();
});
</script>

<style lang="scss">
.add-goods-pop {
	.select-label {
		margin: 24px 0 12px;
	}
}
</style>
