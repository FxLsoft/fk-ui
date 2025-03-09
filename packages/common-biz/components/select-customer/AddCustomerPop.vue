<template>
	<div class="add-customer-form">
		<Spin :loading="!loaded">
			<DynamicForm v-if="loaded" ref="formRef" :model-value="model" class="add-customer-form" :config="config" />
		</Spin>
	</div>
</template>

<script setup lang="tsx">
import { onMounted, reactive, ref } from 'vue';
import { get, set } from 'xe-utils';
import { Spin } from '@erp/common';
import DynamicForm from '../form';
import { getDicApi } from '../dic';
import { pop } from '../pop';
import EditPopover from './EditPopover.vue';
import EditAddressPopover from './EditAddressPopover.vue';
import {
	addOrUpdateCustomerApi,
	getActivityListApi,
	getAddressTreeListApi,
	getChannelListApi,
	getCreditListApi,
	getCustomerDetailApi,
	getDirectorListApi,
	getFranchiseListApi,
	getIndustryOptionsApi,
	getSocialAccountOptionsApi,
	getStoreListApi,
	getUserListByNameApi,
} from './api';
import type { Ref } from 'vue';
import type { PageEmits, PageExpose } from '../pop/interface';
import type { CascaderFieldNames, FormInstance } from '@erp/common';
import type { DynamicFormFieldI, DynamicFormI, DynamicFormInstance } from '../form';
import type { AddCustomerProps } from './interface';
const props = defineProps<AddCustomerProps>();
const emit = defineEmits<PageEmits>();

const loaded = ref(false);
const model = reactive<Record<string, any>>({
	province_city_area: [],
});
const formRef = ref<DynamicFormInstance>();
let formInitialVal = {};

const createSearch = (platform = [1]) => {
	return (field: DynamicFormFieldI, loading: Ref<boolean>) => {
		return searchText => {
			loading.value = true;
			getStoreListApi({ name: searchText, platform })
				.then(res => {
					field.options = res;
				})
				.finally(() => {
					loading.value = false;
				});
		};
	};
};

/**
 * 搜索活动
 */
const searchActivity = (field: DynamicFormFieldI, loading: Ref<boolean>) => {
	return searchText => {
		loading.value = true;
		getActivityListApi(searchText)
			.then(res => {
				field.options = res;
			})
			.finally(() => {
				loading.value = false;
			});
	};
};
/**
 * 搜索公司内荐+员工内荐
 */
const searchUserList = (field: DynamicFormFieldI, loading: Ref<boolean>) => {
	return searchText => {
		loading.value = true;
		getUserListByNameApi(searchText)
			.then(res => {
				field.options = res;
			})
			.finally(() => {
				loading.value = false;
			});
	};
};
/**
 *搜索介绍人 type:1渠道 type:2 转介绍
 * @param field
 * @param loading
 */
const searchChannel = (field: DynamicFormFieldI, loading: Ref<boolean>) => {
	return searchText => {
		loading.value = true;
		let type;
		if (model.source_type == 5) {
			type = 1;
		} else if (model.source_type == 6) {
			type = 2;
		} else if (model.source_type == 11) {
			type = 5;
		}
		getChannelListApi({ name: searchText, type })
			.then(res => {
				field.options = res;
			})
			.finally(() => {
				loading.value = false;
			});
	};
};

const SearchSourceMap = {
	'2': {
		search: searchActivity,
		placeholder: '来源值',
		required: true, //新增/编辑时 具体选项是否必填
		multiple: true,
	},
	'3': {
		search: searchUserList,
		placeholder: '来源值',
		required: true, //新增/编辑时 具体选项是否必填
	},
	'4': {
		search: searchUserList,
		placeholder: '来源值',
		required: true, //新增/编辑时 具体选项是否必填
	},
	'5': {
		search: searchChannel,
		placeholder: '来源值',
		addMore: true,
		required: true, //新增/编辑时 具体选项是否必填
	},
	'6': {
		search: searchChannel,
		placeholder: '来源值',
		addMore: true,
		required: true, //新增/编辑时 具体选项是否必填
	},
	'7': {
		placeholder: '输入来源值',
		required: false, //新增/编辑时 具体选项是否必填
	},
	'8': {
		placeholder: '输入来源值',
		required: false, //新增/编辑时 具体选项是否必填
	},
	'9': {
		placeholder: '来源值',
		required: true, //新增/编辑时 具体选项是否必填
	},
	10: {
		placeholder: '来源值',
		required: true, //新增/编辑时 具体选项是否必填
	},
	11: {
		search: searchChannel,
		placeholder: '来源值',
		required: true, //新增/编辑时 具体选项是否必填
	},
};

const config = reactive<DynamicFormI>({
	showSide: false,
	cols: 2,
	fields: [
		{
			key: 'name',
			label: '客户名称',
			type: 'text',
			placeholder: '例如：公司名称、客户姓名',
			required: true,
		},
		{
			key: 'customer_type',
			label: '客户类型',
			type: 'dic',
			componentProps: {
				code: 'customer_type',
				onClear() {
					doClearByKey('customer_type');
				},
			},
		},
		{
			key: 'e_account',
			label: '电商账号(买家账号)',
			type: 'text',
			required: true,
			disabled: props.bizType === 'edit',
			slots:
				props.bizType === 'edit'
					? {
							suffix: () => (
								<EditPopover
									id={props.bizId}
									disabled={model.deal_count}
									editType="account"
									onUpdate={value => {
										model.e_account = value;
									}}
								></EditPopover>
							),
					  }
					: null,
		},
		{
			key: 'customer_industry_id',
			label: '客户行业',
			type: 'tree',
			/** () => Promise<OptionData> */
			options: () => getIndustryOptionsApi(),
			componentProps: {
				selectable: 'leaf',
				treeProps: {
					defaultExpandAll: false,
					virtualListProps: {
						height: 200,
					},
				},
				onClear() {
					doClearByKey('customer_industry_id');
				},
			},
		},
		{
			key: 'contact_name',
			label: '联系人',
			type: 'text',
			required: true,
		},
		{
			key: 'customer_level',
			label: '客户级别',
			type: 'dic',
			componentProps: {
				code: 'customer_level',
				onClear() {
					doClearByKey('customer_level');
				},
			},
		},
		{
			key: 'join_wechat_type',
			label: '微信类型',
			type: 'select',
			options: [
				{
					label: '企微微信',
					value: 1,
				},
				{
					label: '个人微信',
					value: 2,
				},
				{
					label: '业务微信',
					value: 3,
				},
			],
		},
		{
			key: 'wechat_account',
			label: '微信号',
			type: 'text',
		},
		{
			key: 'phone',
			label: '手机号/电话',
			placeholder: '手机或座机号码',
			type: 'text',
			disabled: props.bizType === 'edit',
			slots:
				props.bizType === 'edit'
					? {
							suffix: () => (
								<EditPopover
									id={props.bizId}
									editType="phone"
									onUpdate={value => {
										model.phone = value;
									}}
								></EditPopover>
							),
					  }
					: null,
		},
		{
			key: 'email',
			label: '邮箱',
			type: 'text',
			disabled: props.bizType === 'edit',
		},
		{
			key: 'province_city_area',
			label: '地区',
			type: 'cascader',
			options: () => getAddressTreeListApi(),
			componentProps: {
				checkStrictly: true,
				pathMode: true,
				virtualListProps: {
					height: 200,
				},
				fieldNames: { label: 'name', value: 'id' } as CascaderFieldNames,
				onClear() {
					doClearByKey('province_city_area');
				},
			},
		},
		{
			key: 'address',
			label: '详细地址',
			type: 'text',
			slots: {
				suffix: () => (
					<EditAddressPopover
						editType="phone"
						onUpdate={data => {
							model.contact_name = data.person_name;
							model.address = data.short_address;
							if (data.tel) {
								model.phone = data.tel;
							}
							if (data.region?.area_id) {
								model.province_city_area = [data.region.province_id, data.region.city_id, data.region.area_id];
							} else if (data.region?.city_id) {
								model.province_city_area = [data.region.province_id, data.region.city_id];
							} else if (data.region?.province_id) {
								model.province_city_area = [data.region.province_id];
							}
						}}
					></EditAddressPopover>
				),
			},
		},
		{
			key: 'source_type',
			label: '客户来源',
			type: 'dic',
			componentProps: {
				code: 'thread_source',
				onChange() {
					model.source_id = '';
					doThreadSourceChange();
				},
			},
		},
		{
			key: 'source_id',
			label: '来源值',
			type: 'select',
			required: true,
			options: [],
			show() {
				return !!model.source_type;
			},
			componentProps: {},
		},
		{
			key: 'credit_bill_type',
			label: '启用授信',
			type: 'dic',
			componentProps: {
				code: 'customer_bill_type',
				onChange(value) {
					model.credit_id = '';
					doBillTypeChange();
				},
			},
		},
		{
			key: 'credit_id',
			label: '授信类型',
			placeholder: '请选择授信类型',
			type: 'select',
			options: [],
		},
		{
			key: 'user_id',
			label: '负责人',
			type: 'tree',
			options: () => getDirectorListApi(),
			componentProps: {
				selectable: 'leaf',
				treeProps: {
					defaultExpandAll: false,
					virtualListProps: {
						height: 200,
					},
				},
			},
			show: props.bizType === 'add',
		},
		{
			key: 'user_name',
			label: '负责人',
			type: 'text',
			disabled: true,
			placeholder: ' ',
			show: props.bizType === 'edit',
		},
		{
			key: 'dispatch_id',
			label: '派单人',
			type: 'tree',
			options: () => getDirectorListApi(),
			componentProps: {
				selectable: 'leaf',
				treeProps: {
					defaultExpandAll: false,
					virtualListProps: {
						height: 200,
					},
				},
				onClear() {
					doClearByKey('dispatch_id');
				},
			},
		},
		{
			key: 'social_account_id',
			label: '社群账号(归属手机)',
			type: 'tree',
			options: () => getSocialAccountOptionsApi(),
			componentProps: {
				selectable: 'leaf',
				onClear() {
					doClearByKey('social_account_id');
				},
			},
		},
		{
			key: 'dealer_id',
			label: '经销商',
			type: 'select',
			options: () => getFranchiseListApi(),
			componentProps: {
				onClear() {
					doClearByKey('dealer_id');
				},
			},
		},
		{
			key: 'customer_group',
			label: '客户归属',
			type: 'dic',
			componentProps: {
				code: 'sync_customer',
				onClear() {
					doClearByKey('customer_group');
				},
			},
		},
		{
			key: 'remark',
			label: '备注',
			type: 'textarea',
			span: 2,
		},
	],
});

const doClearByKey = (key: string) => {
	if (props.bizType === 'edit') {
		set(model, key, get(formInitialVal, key));
	}
};

const doBillTypeChange = () => {
	if (model.credit_bill_type) {
		getCreditListApi({
			page: 1,
			page_size: 500,
			bill_type: model.credit_bill_type,
		}).then(res => {
			const list = (res.list || []).map(item => {
				return {
					value: item.id,
					label: item.bill_name,
				};
			});
			const find = config.fields.find(v => v.key === 'credit_id');
			if (find) {
				find.options = list;
			}
		});
	}
};

const doThreadSourceChange = () => {
	const sourceType = model.source_type;
	if (sourceType) {
		const sourceField = config.fields?.find(v => v.key === 'source_id');
		if (sourceField) {
			const item = SearchSourceMap[sourceType];
			if (item) {
				if (item.search) {
					const loading = ref(false);
					sourceField.type = 'select';
					const search = item.search(sourceField, loading);
					sourceField.componentProps = {
						loading,
						onSearch: search,
					};
					sourceField.options = [];
					search();
				} else {
					sourceField.type = 'text';
				}
				sourceField.required = item.required;
				sourceField.label = item.placeholder;
				sourceField.multiple = false;
				// sourceField.multiple = item.multiple;
			}
		}
	}
};

const init = async () => {
	await getDicApi('thread_source').then(res => {
		res.forEach(item => {
			if (SearchSourceMap[item.value]) {
				SearchSourceMap[item.value].platform = item.attribute.platform;
			} else {
				SearchSourceMap[item.value] = {
					placeholder: '来源值',
					required: true,
				};
			}
			if (item.attribute?.platform) {
				//本地没有这个配置, 线上新增的配置加了platform
				SearchSourceMap[item.value].search = createSearch(item.attribute.platform);
			}
		});
	});
	if (props.bizId) {
		emit('loading', true);
		await getCustomerDetailApi(props.bizId)
			.then(res => {
				const data = res.item || {};
				formInitialVal = {
					...data,
					name: data.name, //客户名称
					customer_industry_id: data.customer_industry_id || null,
					customer_type: data.customer_type || null,
					customer_level: data.customer_level || null,
					join_wechat_type: data.join_wechat_type || null,
					wechat_account: data.wechat_account,
					contact_name: data.contact_name,
					phone: data.phone,
					email: data.email,
					e_account: data.e_account,
					province_city_area: [data.province_id, data.city_id, data.area_id].filter(item => item),
					address: data.address,
					//source加上 || null是防止回显的时候显示数字0
					// source: [data.source_type || null, data.source_id || null, data.source_other],
					credit_bill_type: data.credit_bill_type || null,
					// credit_id: data.credit_id || null, 放到nextTick中
					user_id: data.user_id || null,
					user_name: data.user_name,
					dispatch_id: data.dispatch_id || null,
					dispatch_name: data.dispatch_name,
					social_account: data.social_account_id || null,
					dealer_id: data.dealer_id || null,
					remark: data.remark,
					customer_group: data.customer_group,
					deal_count: data.deal_count,
					source_type: data.source_type || null,
					source_other: data.source_other || '',
				};
				model.deal_count = data.deal_count;
				config.fields.forEach(field => {
					set(model, field.key, get(formInitialVal, field.key));
				});
				doThreadSourceChange();
				doBillTypeChange();
			})
			.finally(() => {
				loaded.value = true;
				emit('loading', false);
			});
	} else {
		loaded.value = true;
	}
};

onMounted(() => {
	init();
});

defineExpose<PageExpose>({
	async getModel() {
		const formInstance: FormInstance = formRef.value.getInstance();
		const errors = await formInstance.validate();
		if (!errors) {
			const params = {
				id: props.bizId,
				...model,
				province_id: model.province_city_area[0] || null,
				city_id: model.province_city_area[1] || null,
				area_id: model.province_city_area[2] || null,
				source_other: model.source_id,
			};
			const res = await addOrUpdateCustomerApi(params);
			if (res) {
				let message = '操作成功';
				if (props.bizType === 'add') {
					message = '添加成功';
				} else if (props.bizType === 'edit') {
					message = '修改成功';
				}
				pop.success(message);
				return res;
			}
		}
		/**
		 * 校验失败
		 */
		return false;
	},
});
</script>

<style lang="scss">
.add-customer-form {
	.fk-spin {
		width: 100%;
		min-height: 420px;
	}
	.form-fields-group {
		padding: 0;
	}
	// .fk-textarea {
	// 	min-height: 30px;
	// }
}
</style>
