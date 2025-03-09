<template>
	<Popconfirm v-model:popupVisible="popupVisible" :disabled="disabled" position="bottom" ok-text="保存" width="300" @before-ok="handleBeforeOk">
		<template #content>
			<Form ref="formRef" class="edit-customer-form" :model="form" :rules="rules" layout="vertical">
				<FormItem v-if="editType === 'phone'" field="phone" hide-label> <Input v-model="form.phone" placeholder="手机号/电话" type="text" /></FormItem>
				<FormItem v-if="editType === 'account'" field="e_account" hide-label>
					<Input v-model="form.e_account" placeholder="电商账号(买家账号)" type="text"
				/></FormItem>
			</Form>
		</template>
		<Button type="text" :disabled="disabled">{{ props.btnText }}</Button>
	</Popconfirm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Button, Form, FormItem, Popconfirm } from '@erp/common';
import Input from '../input';
import { pop } from '../pop';
import { updateCustomerSingleApi } from './api';
import type { FieldRule, FormInstance } from '@erp/common';

const props = withDefaults(
	defineProps<{
		id: string | number;
		btnText?: string;
		editType?: 'phone' | 'account';
		disabled?: boolean;
		source?: string;
	}>(),
	{
		btnText: '修改',
		disabled: false,
		source: '1',
	},
);

const emit = defineEmits(['update']);

const popupVisible = ref(false);

const formRef = ref<FormInstance>();
const form = reactive({
	phone: '',
	e_account: '',
});
function validatePhone(phoneStr) {
	return /^((0\d{2,3}(-)?\d{5,9}(-\d{1,9})?)|((1[3456789])\d{9}(-\d{1,7})?))$/.test(phoneStr);
}

const rules: Record<string, FieldRule | FieldRule[]> = {
	phone: [
		{ required: true, message: '号码不能为空' },
		{
			validator(value, callback) {
				if (validatePhone(value)) {
					callback();
				} else {
					callback('手机号格式不对');
				}
			},
		},
	],
	e_account: [{ required: true, message: '账号不能为空' }],
};

const handleBeforeOk = async close => {
	const errors = await formRef.value?.validate();
	if (errors) return;
	const params: Record<string, any> = {
		id: props.id,
		source: props.source,
	};
	let value = '';
	if (props.editType === 'account') {
		value = params.e_account = form.e_account;
	} else if (props.editType === 'phone') {
		value = params.phone = form.phone;
	}
	await updateCustomerSingleApi(params)
		.then(res => {
			pop.success('修改成功');
			emit('update', value);
			close(res);
		})
		.catch(() => {
			close();
		});
};
</script>

<style lang="scss">
.edit-customer-form {
	.fk-form-item {
		margin-bottom: 0;
	}
}
</style>
