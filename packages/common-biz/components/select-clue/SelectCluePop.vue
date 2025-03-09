<template>
	<Modal
		v-model:visible="visible"
		width="60%"
		class="select-clue-pop"
		:loading="loading"
		:title="props.title"
		@before-ok="handleBeforeOk"
		@cancel="handleCancel"
	>
		<div class="select-clue-pop-header">
			<Input
				v-model="searchState.selectValue"
				type="search-input"
				class="select-input"
				:loading="gridOptions.loading"
				:search-button="true"
				@search="handleQuery"
				@keyup.stop.enter="handleQuery"
			>
				<template #prepend>
					<Input v-model="searchState.selectKey" type="select" :options="searchState.options" :allow-clear="false" />
				</template>
			</Input>
		</div>
		<VxeGrid ref="gridRef" style="margin-top: 12px" v-bind="gridOptions" v-on="gridEvents" />
	</Modal>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRaw } from 'vue';
import { Modal } from '@erp/common';
import { VxeGrid } from '../../grid-table';
import Input from '../input';
import { pop } from '../pop';
import { queryClueListApi } from './api';
import type { OptionData } from '../input';
import type { SelectCluePopProps } from './interface';
import type { VxeGridInstance, VxeGridListeners, VxeGridProps } from '../../grid-table/types';

const props = withDefaults(defineProps<SelectCluePopProps>(), {
	multiple: false,
	title: '选择线索',
});

const visible = ref(true);
const loading = ref(true);

const searchState = reactive({
	selectKey: 'name',
	selectValue: '',
	options: [
		{
			label: '线索名称',
			value: 'name',
		},
		{
			label: '手机号/电话',
			value: 'phone',
		},
	] as OptionData[],
});

/**
 * 搜索
 * @param value
 */
const handleQuery = () => {
	console.log('handleQuery >>');
	gridOptions.pagerConfig!.current = 1;
	query();
};

const query = () => {
	gridOptions.loading = true;
	const params = {
		page: gridOptions.pagerConfig!.current,
		page_size: gridOptions.pagerConfig!.pageSize,
		[searchState.selectKey]: searchState.selectValue,
	};
	queryClueListApi(params)
		.then(res => {
			gridOptions.data = (res.list || []).map(item => {
				return {
					clueName: item.name,
					phone: item.phone,
					registrant: item.user_name,
					createTime: item.created_at,
					id: item.id,
				};
			});
			gridOptions.pagerConfig!.total = res.total;
			nextTick(() => {
				gridRef.value?.clearSelected();
			});
		})
		.finally(() => {
			gridOptions.loading = false;
		});
};

const gridEvents: VxeGridListeners = {
	pageChange(params) {
		gridOptions.pagerConfig!.current = params.current;
		gridOptions.pagerConfig!.pageSize = params.pageSize;
		query();
	},
};

const gridRef = ref<VxeGridInstance>();
const gridOptions = reactive<VxeGridProps>({
	border: false,
	stripe: false,
	loading: false,
	maxHeight: 600,
	minHeight: 300,
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
	pagerConfig: {
		showSelected: '已选择 {0} 条',
		current: 1,
		pageSize: 50,
		total: 0,
		showTotal: true,
		showJumper: true,
		showPageSize: true,
		size: 'mini',
	},
	columns: [
		{
			type: 'seq',
			title: '#',
			width: 55,
		},
		{
			field: 'clueName',
			title: '线索名称',
		},
		{
			field: 'phone',
			title: '手机号/电话',
		},
		{
			field: 'registrant',
			title: '负责人',
		},
		{
			field: 'createTime',
			title: '创建时间',
			width: 220,
		},
	],
	data: [],
});

const handleCancel = () => {
	visible.value = false;
};

const handleBeforeOk = close => {
	const selected = gridRef.value!.getCurrentRecord();
	if (!selected) {
		pop.warning('请选择线索');
		close(false);
	}
	close(toRaw(selected));
};

const init = () => {
	query();
};

onMounted(() => {
	init();
});
</script>

<style lang="scss">
.select-clue-pop {
	--select-width: 180px;
	.select-clue-pop-header {
		display: inline-flex;
		width: 100%;
		justify-content: space-between;
	}
	.select-input {
		width: 420px;
	}
	.fk-input-prepend {
		.fk-select {
			width: var(--select-width);
		}
	}
}
</style>
