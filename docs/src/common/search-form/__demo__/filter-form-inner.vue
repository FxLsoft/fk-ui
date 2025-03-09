<template>
	<div class="filter-form-demo">
		<FilterForm :model-value="model" :config="formConfig" @column-settings="handleColumnSettings" @query="handleQuery" @reset="handleQuery" />
	</div>
	<h5 style="margin-top: 20px">表单数据模型</h5>
	<pre style="padding: 12px; margin: 12px">{{ model }}</pre>
</template>

<script setup lang="tsx">
import { computed, reactive } from 'vue';
import { cloneDeep } from 'lodash-es';
import { FilterForm, pop } from '@erp/biz';
import { config } from './filter-config.tsx';

const formConfig = computed(() => {
	const cfg = cloneDeep(config);
	/**
	 * 标签在输入框里面
	 */
	cfg.labelLayout = 'inner';
	/**
	 * 查询池配置
	 */
	cfg.queryPool = 'ceshi-pool';
	return cfg;
});

const data = Array.from({ length: 8 })
	.fill(undefined)
	.map((_, index) => ({
		value: `option${index + 1}`,
		label: `Option ${index + 1}`,
	}));
const value = ['option1', 'option3', 'option5'];
const handleColumnSettings = () => {
	pop.createModal(
		import('../../modal/__demo__/columns-config.vue'),
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

const model = reactive({
	key1: '',
	key4: [],
	key10: [],
	key11: [],
	key7: [],
});

const handleQuery = model => {
	console.log('handleQuery >>', model);
};
</script>

<style scoped lang="less">
.filter-form-demo {
}
</style>
