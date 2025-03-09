<template>
	<fk-button type="primary" @click="handleOpenModal">打开 Modal 弹窗</fk-button>
</template>
<script setup>
import { pop } from '@erp/biz';
const data = Array.from({ length: 8 })
	.fill(undefined)
	.map((_, index) => ({
		value: `option${index + 1}`,
		label: `Option ${index + 1}`,
	}));
const value = ['option1', 'option3', 'option5'];
const handleOpenModal = () => {
	pop.createModal(
		import('./columns-config.vue'),
		{
			options: data,
			value,
		},
		{ title: '列表配置' },
	)
		.then(params => {
			console.log('确认...', params);
		})
		.catch(e => {
			console.log('取消...', e);
		});
};
</script>
