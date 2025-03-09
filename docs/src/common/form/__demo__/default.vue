<template>
	<div class="form-demo1">
		<DynamicForm v-model="model" :config="formConfig">
			<!-- 支持slots -->
			<template #image="{ field, model, modelValue }">
				{{ model }}
				{{ field }}
				{{ modelValue }}
			</template>
		</DynamicForm>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { DynamicForm } from '@erp/biz';
import { config } from './form-config';
import type { PageExpose } from '@erp/biz';

const formConfig = cloneDeep(config);
/**
 * 关闭左侧导航
 */
formConfig.showSide = false;

// formConfig.fields[0] = reactive(formConfig.fields[0]);
const model = ref({
	key13: '1',
});
setTimeout(() => {
	// formConfig.fields[1].type = 'custom';
	// formConfig.fields[1].component = 'image';
	// /**
	//  * field 自带响应式
	//  */
	// formConfig.fields[0].options = [
	// 	{
	// 		value: '1',
	// 		label: '订单类型一',
	// 	},
	// 	{
	// 		value: '2',
	// 		label: '订单类型二',
	// 	},
	// 	{
	// 		value: '3',
	// 		label: '订单类型三',
	// 	},
	// 	{
	// 		value: '4',
	// 		label: '订单类型四',
	// 	},
	// ];
}, 3000);

defineExpose<PageExpose>({
	getModel() {
		return model.value;
	},
});
</script>

<style lang="scss" scoped>
.form-demo1 {
	padding: 0;
	border: 1px solid var(--color-border-1);
	border-radius: var(--border-radius-small);
	height: 560px;
}
</style>
