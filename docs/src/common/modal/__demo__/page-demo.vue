<template>
	<fk-button type="primary" @click="handleOpenPage">打开 Page 弹窗</fk-button>
</template>
<script setup>
import { pop } from '@erp/biz';
// pop.container = '.VPDoc';
const handleOpenPage = () => {
	pop.createPage(import('./custom-page.vue'), { title: '配置弹窗' })
		.then(params => {
			console.log('确认...', params);
		})
		.catch(e => {
			console.log('取消...', e);
		});
};
</script>
