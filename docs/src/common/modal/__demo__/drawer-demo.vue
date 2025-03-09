<template>
	<fk-space direction="vertical">
		<fk-button type="primary" @click="handleOpenDrawer">打开 Drawer 弹窗</fk-button>
		<fk-button type="primary" @click="handleOpenDrawer1">打开 No Mask Drawer 弹窗</fk-button>
		<fk-button type="primary" @click="handleOpenDrawer2">打开之后数据更新弹窗</fk-button>
	</fk-space>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { pop } from '@erp/biz';

const handleOpenDrawer = () => {
	pop.createDrawer(import('./default.vue'), { title: '配置弹窗' })
		.then(params => {
			console.log('确认...', params);
		})
		.catch(e => {
			console.log('取消...', e);
		});
};

const handleOpenDrawer1 = () => {
	pop.createDrawer(import('./default.vue'), { title: '配置弹窗', mask: false, width: '900px' })
		.then(params => {
			console.log('确认...', params);
		})
		.catch(e => {
			console.log('取消...', e);
		});
};
/**
 * 动态传参
 */
const model = reactive({
	footer: 'footer',
	name: '动态传参 - 配置弹窗',
});
const handleOpenDrawer2 = () => {
	// 唯一标识drawer
	const drawerId = 'drawer-id';
	if (pop.hasDrawer(drawerId)) {
		model.name = `参数穿进去了${Date.now()}`;
		return;
	}
	pop.createDrawer(import('./default.vue'), {
		id: drawerId,
		title: '配置弹窗',
		mask: false,
		width: '900px',
		model, // import('./default.vue') 组件的参数
		clickOutsideToClose: true,
		onBeforeOutsideClose(e: MouseEvent) {
			console.log('onBeforeOutsideClose >>', e);
			model.footer = 'onBeforeOutsideClose';
			return !document.querySelector<HTMLElement>('._common_modal_README').contains(e.target as Node);
		},
	})
		.then(params => {
			console.log('确认...', params);
		})
		.catch(e => {
			console.log('取消...', e);
		});
};
</script>
<style lang="less">
.drawer-demo {
	width: 1000px;
	margin-left: auto;
}
</style>
