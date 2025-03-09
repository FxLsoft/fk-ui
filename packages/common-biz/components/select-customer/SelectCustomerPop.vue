<template>
	<Modal
		v-model:visible="visible"
		width="80%"
		class="select-customer-pop"
		:loading="loading"
		:title="props.title || '选择用户'"
		@before-ok="handleBeforeOk"
		@cancel="handleCancel"
	>
		<div class="select-customer-pop-header">
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

			<Button v-if="showCreateBtn" type="primary" @click="handleCreateCustomer">新建客户</Button>
		</div>
		<VxeGrid ref="gridRef" style="margin-top: 12px" v-bind="gridOptions" v-on="gridEvents" />
	</Modal>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRaw } from 'vue';
import { Button, Modal } from '@erp/common';
import { VxeGrid } from '../../grid-table';
import Input from '../input';
import { pop } from '../pop';
import { queryCustomerListApi } from './api';
import AddCustomerPop from './AddCustomerPop.vue';
import type { OptionData } from '../input';
import type { SelectCustomerPopProps } from './interface';
import type { VxeGridInstance, VxeGridListeners, VxeGridProps } from '../../grid-table/types';

const props = withDefaults(defineProps<SelectCustomerPopProps>(), {
	multiple: false,
	showCreateBtn: true,
});

const visible = ref(true);
const loading = ref(true);

const searchState = reactive({
	selectKey: 'name',
	selectValue: '',
	options: [
		{
			label: '客户名称',
			value: 'name',
		},
		{
			label: '联系人',
			value: 'contact_name',
		},
		{
			label: '手机号/电话',
			value: 'phone',
		},
		{
			label: '电商账号(买家账号)',
			value: 'e_account',
		},
	] as OptionData[],
});

/**
 * 搜索
 * @param value
 */
const handleQuery = () => {
	gridOptions.pagerConfig!.current = 1;
	query();
};

/**
 * 新建客户
 */
const handleCreateCustomer = () => {
	pop.createModal(
		AddCustomerPop,
		{ bizType: 'add' },
		{
			width: '60%',
			title: '添加客户',
		},
	).then(res => {
		query();
	});
};

const query = () => {
	gridOptions.loading = true;
	const params = {
		page: gridOptions.pagerConfig!.current,
		page_size: gridOptions.pagerConfig!.pageSize,
		[searchState.selectKey]: searchState.selectValue,
	};
	queryCustomerListApi(params)
		.then(res => {
			gridOptions.data = (res.list || []).map(item => {
				return {
					customerName: item.name,
					contactName: item.contact_name,
					phone: item.phone,
					eAccount: item.e_account,
					user_name: item.user_name,
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
			field: 'customerName',
			title: '客户名称',
		},
		{
			field: 'contactName',
			title: '联系人',
		},
		{
			field: 'phone',
			title: '手机号/电话',
		},
		{
			field: 'eAccount',
			title: '电商账号(买家账号)',
		},
		{
			field: 'user_name',
			title: '负责人',
		},
		{
			field: 'createTime',
			title: '创建时间',
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
		pop.warning('请选择客户');
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
.select-customer-pop {
	--select-width: 180px;
	.select-customer-pop-header {
		display: inline-flex;
		width: 100%;
		justify-content: space-between;
	}
	.select-input {
		width: 420px;
	}
	.erp-input {
		// width: 220px;
	}
	.fk-input-prepend {
		.fk-select {
			width: var(--select-width);
		}
	}
}
</style>
