<template>
	<div class="search-form-demo">
		<SearchForm :model-value="vm" :config="config" @query="handleQuery" @reset="handleReset">
			<!-- 参照 @CustomFormFieldComponentProps -->
			<template #custom="{ field, model, modelValue, options, onExpandInput, onExpandField }">
				<fk-space direction="vertical">
					<fk-button type="primary" size="mini" @click="e => onExpandInput()">自定义展开Input</fk-button>
					<fk-button type="primary" size="mini" @click="e => onExpandField()">自定义展开Field</fk-button>
				</fk-space>
				<JsonViewer :data="field" />
				<JsonViewer :data="model" />
				<JsonViewer :data="modelValue" />
				<JsonViewer :data="options" />
			</template>
		</SearchForm>
	</div>
	<h5 style="margin-top: 20px">表单数据模型</h5>
	<JsonViewer :data="vm" />
</template>

<script setup lang="tsx">
import { onUnmounted, reactive } from 'vue';
import { SearchForm } from '@erp/biz';
import { config } from './form-config.ts';

config.queryPool = 'ceshi-search-form-1';
config.labelLayout = 'expand';

const vm = reactive({
	key1: '',
	key4: [],
	key10: [],
	key11: [],
	key7: [],
});

const handleQuery = model => {
	console.log('query >>', model);
};

const handleReset = model => {
	console.log('reset >>', model);
};

/**
 * 动态更新选项
 */
const intervalId = setInterval(() => {
	const field = config.fields.find(item => item.key === 'custom');
	const num = Math.floor(Math.random() * 10);
	field.options = [];
	for (let i = 0; i < num; i++) {
		field.options.push({
			label: `选项${i}`,
			value: i,
		});
	}
}, 3000);

onUnmounted(() => {
	clearInterval(intervalId);
});
</script>

<style scoped lang="less">
.search-form-demo {
	height: 500px;

	.search-form {
		border: 1px solid var(--color-border-1);
	}
}
</style>
