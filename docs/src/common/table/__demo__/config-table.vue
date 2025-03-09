<template>
	<div class="config-table">
		<VxeGrid ref="grid" v-bind="gridOptions" v-on="gridEvents">
			<template #top>
				<FilterForm :model-value="searchModel" :config="formConfig" @query="handleQuery" @reset="handleQuery" />
			</template>
			<template #operator="{ column }">
				<FkButton v-for="el in column.params" :key="el.code" size="small" type="text">{{ el.label }}</FkButton>
			</template>
		</VxeGrid>
	</div>
</template>

<script setup lang="tsx">
import { onMounted, reactive, useTemplateRef } from 'vue';
import { FilterForm, VxeGrid, createColSettingsPop, pop, reqGetDynamicTableApi, reqSaveDynamicTableApi } from '@erp/biz';
import { clipboard } from '@erp/common';
import data from './data.json';
// import type { VxeGridInstance } from '@erp/biz/types';
import type { SearchFormI, VxeGridInstance, VxeGridListeners, VxeGridProps } from '@erp/biz';

const options = Array.from({ length: 8 })
	.fill(undefined)
	.map((_, index) => ({
		value: `option${index + 1}`,
		label: `Option ${index + 1}`,
	}));

/**
 * 查询数据模型
 * 如果多选的默认值为数组
 */
const searchModel = reactive({
	key5: [],
	key7: [],
	key9: [],
});

/**
 * 查询组件配置 用SearchFormI参考输入
 */
const formConfig: SearchFormI = {
	gridProps: {
		cols: 4,
		colGap: 12,
		rowGap: 12,
	},
	labelLayout: 'inner',
	queryPool: 'ceshi-pool-table',
	fields: [
		{
			key: 'key1',
			label: '文本输入',
			type: 'text',
			componentProps: {
				maxLength: 30,
			},
		},
		{
			key: 'key2',
			label: '整数输入',
			type: 'integer',
		},
		{
			key: 'key3',
			label: '数据输入',
			type: 'number',
			componentProps: {
				max: 99999,
				min: 0,
			},
		},
		{
			key: 'key4',
			label: '日期输入',
			type: 'date',
			multiple: false,
		},
		{
			key: 'key5',
			// 因为日期范围选择组件有两个placeholder，比较特殊，不配置label，placeholder配置的是数组
			label: '范围日期输入',
			type: 'date',
			placeholder: ['开始日期1', '结束日期2'],
			multiple: true,
		},
		{
			key: 'key6',
			label: '选择器输入',
			type: 'select',
			multiple: false,
			options,
		},
		{
			key: 'key7',
			label: '选择器输入',
			type: 'select',
			multiple: true,
			options,
		},
		{
			key: 'key8',
			label: '字典输入',
			multiple: false,
			type: 'dic',
			componentProps: {
				code: 'unit',
			},
		},
		{
			key: 'key9',
			label: '字典输入',
			multiple: true,
			type: 'dic',
			componentProps: {
				code: 'unit',
			},
		},
	],
};

const handleQuery = () => {
	gridOptions.pagerConfig!.current = 1;
	handlePageData();
};

const gridRef = useTemplateRef<VxeGridInstance>('grid');

const statusLists = [
	{ value: 1, color: '#f53f3f', label: '待付款', borderColor: 'orangered' },
	{ value: 2, color: '#7816ff', label: '已支付待审核', borderColor: 'orange' },
	{ value: 3, color: '#00b42a', label: '发货中', borderColor: 'gold' },
	{ value: 4, color: '#165dff', label: '已发货', borderColor: 'lime' },
	{ value: 5, color: '#ff7d00', label: '已取消', borderColor: 'green' },
	{ value: 6, color: '#eb0aa4', label: '已完成', borderColor: 'cyan' },
];

/**
 * 表格 grid 配置
 */
const gridOptions = reactive<VxeGridProps>({
	// 配置唯一标识，对存储有关
	id: 'config-table--2',
	border: false,
	stripe: false,
	loading: false,
	height: 600,
	showOverflow: true,
	showFooter: true,
	layouts: ['Top', 'Toolbar', 'Table', 'Pager'],
	columnConfig: {
		resizable: true,
		width: 120,
		maxWidth: 360,
		isHover: true,
	},
	rowConfig: {
		isHover: true,
		resizable: true,
		isCurrent: true,
		height: 40,
	},
	filterConfig: {
		iconMatch: 'erpfont icon-filter',
	},
	sortConfig: {
		trigger: 'cell',
		// 是否远程搜索
		// remote: true,
	},
	keyboardConfig: {
		isArrow: true,
		isEnter: true,
	},
	checkboxConfig: {
		highlight: true,
		range: true,
		isShiftKey: true,
		trigger: 'cell',
	},
	areaConfig: {
		autoClear: true,
	},
	mouseConfig: {
		selected: true,
	},
	customConfig: {
		storage: true,
		// 获取配置缓存，需要配置id
		async restoreStore(params) {
			return reqGetDynamicTableApi(params.id).then(res => {
				return res.userFields || params.storeData;
			});
		},
		async updateStore(params) {
			reqSaveDynamicTableApi(params.id, params.storeData).then(res => {
				pop.success('保存成功！');
			});
		},
	},
	/** 配置 */
	toolbarConfig: {
		custom: true,
		refresh: true,
		zoom: true,
		import: true,
		export: true,
		buttons: [
			{
				code: '123',
				label: '新增商品',
				type: 'primary',
			},
			{
				code: '2',
				label: '导入商品',
				dropdowns: [
					{
						code: 'command_1',
						label: '导出文件1',
					},
					{
						code: 'command_2',
						label: '导出文件2',
					},
					{
						code: 'command_3',
						label: '导出文件3',
						disabled: true,
					},
				],
			},
		],
		tools: [
			{
				code: '123',
				label: '新增商品',
				type: 'primary',
			},
			{
				code: '2',
				label: '导入商品',
				dropdowns: [
					{
						code: 'command_11',
						label: '导出文件1',
					},
					{
						code: 'command_21',
						label: '导出文件2',
					},
					{
						code: 'command_31',
						label: '导出文件3',
						disabled: true,
					},
				],
			},
		],
	},
	importConfig: {},
	exportConfig: {
		type: 'csv',
	},
	pagerConfig: {
		current: 1,
		total: 0,
		defaultPageSize: 20,
		showSelected: '已选择 {0} 条',
		showTotal: true,
		showJumper: true,
		showPageSize: true,
		size: 'mini',
	},
	loadingConfig: {
		text: '加载中...',
	},
	scrollY: {
		enabled: true,
		gt: 16,
		oSize: 20,
	},
	menuConfig: {
		body: {
			options: [
				[
					{
						code: 'copy',
						name: '复制内容（Ctrl+C）',
						prefixIcon: 'vxe-table-icon-fullscreen',
						visible: ({ row }) => {
							return !!row;
						},
						children: [
							{
								code: 'clear',
								name: '清除内容',
								visible({ row }) {
									return !!row;
								},
							},
							{ code: 'reload', name: '刷新表格', prefixIcon: 'vxe-table-icon-repeat', visible: true, disabled: false },
						],
					},
					{ code: 'clear', name: '清除内容', visible: true, disabled: true },
					{
						code: 'reload',
						name: '刷新表格',
						prefixIcon: 'vxe-table-icon-repeat',
						visible: true,
						disabled: false,
					},
				],
				[
					{ code: 'myPrint', name: '打印', suffixConfig: { content: 'Ctrl+P' }, visible: true, disabled: false },
					{ code: 'myExport', name: '导出.csv', prefixConfig: { icon: 'vxe-icon-download' }, visible: true, disabled: false },
				],
			],
		},
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
			slots: {
				header(params) {
					return <fk-button shape="circle" class="erpfont icon-shezhi" onClick={() => createColSettingsPop(params.$grid!)} />;
				},
			},
		},
		{ field: 'id', title: '内部订单号', sortable: true },
		{
			field: 'order_status',
			title: '状态',
			width: 220,
			slots: {
				/** 支持jsx/tsx */
				default({ row, column }) {
					const find = statusLists.find(v => v.value == row[column.field]);
					if (find) {
						return [
							<fk-tag color={find.color}>{find.label}</fk-tag>,
							<fk-tag style={{ marginLeft: '6px' }} color={find.borderColor} bordered={true}>
								{find.label}
							</fk-tag>,
						];
					}
					return null;
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
			width: 120,
			canMouseSelected: false,
			className: 'cell-btns',
			params: [
				{
					code: 'detail',
					label: '详情',
				},
				{
					code: 'edit',
					label: '编辑',
				},
			],
		},
	],
	data: [],
	footerMethod(params) {
		const total = params.data.reduce((pre, cur) => {
			const value = Number(+pre + (+cur.payment_fee || 0)).toFixed(2);
			return value;
		}, 0);
		return [{ seq: '合计', payment_fee: total }];
	},
});
onMounted(() => {
	handlePageData();
});

const handlePageData = () => {
	gridOptions.loading = true;
	setTimeout(() => {
		let list = data.data.list;
		for (let i = 0; i < 5; i++) {
			list = list.concat(list);
		}
		gridOptions.data = list;
		gridOptions.loading = false;
		gridOptions.pagerConfig!.total = data.data.total;
	}, 500);
};

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
		console.log('event >>', event);
		clipboard(JSON.stringify(event.row));
	},
	sortChange(params) {
		console.log('sortChange >>', params);
	},
};
</script>

<style scoped lang="less">
.config-table {
	:deep(.cell-btns) {
		.vxe-cell {
			padding: 0;
		}

		button + button {
			margin-left: -12px;
		}
	}
}
</style>
