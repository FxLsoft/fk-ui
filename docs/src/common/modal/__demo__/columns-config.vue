<template>
	<div class="columns-config">
		<fk-transfer v-model="selected" height="430px" :title="['不显示列', '显示列']" :data="options" />
		<p style="color: var(--color-text-3); margin-top: 12px">勾选字段，点击【&gt;】【&lt;】按钮移入对应列方可生效</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PageExpose } from '@erp/biz';

/**
 * 入参
 */
const props = defineProps(['options', 'value']);

/**
 * 触发事件
 */
const emit = defineEmits<{
	(event: 'close', param?: any): void;
	(event: 'ok', param?: any): void;
	(event: 'loading', l: boolean): void;
}>();

const selected = ref(props.value);

/**
 * 给Modal调用的
 */
defineExpose<PageExpose>({
	/**
	 * 返回给调用方
	 */
	getModel(): Promise<Record<string, any>> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(selected.value);
			}, 1000);
		});
	},
});
</script>

<style lang="scss" scoped>
.columns-config {
	:deep(.fk-transfer-view) {
		height: 420px;
	}
}
</style>
