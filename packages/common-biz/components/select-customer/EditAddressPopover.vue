<template>
	<Popconfirm v-model:popupVisible="popupVisible" :disabled="disabled" position="bottom" ok-text="解析" @before-ok="handleBeforeOk">
		<template #content>
			<Input v-model="model.address" :rows="6" style="width: 260px; height: 120px" placeholder="详细地址" type="textarea" />
		</template>
		<Button type="text" :disabled="disabled">{{ props.btnText }}</Button>
	</Popconfirm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Button, Popconfirm } from '@erp/common';
import Input from '../input';
import { analysisAddressReverseApi } from './api';

const props = withDefaults(
	defineProps<{
		btnText?: string;
		disabled?: boolean;
	}>(),
	{
		btnText: '解析',
		disabled: false,
	},
);

const emit = defineEmits(['update']);

const popupVisible = ref(false);

const model = reactive({
	address: '',
});

const handleBeforeOk = close => {
	if (!model.address) {
		close();
	}
	analysisAddressReverseApi(model.address)
		.then(res => {
			emit('update', res);
			close(res);
		})
		.catch(() => {
			close();
		});
};
</script>
