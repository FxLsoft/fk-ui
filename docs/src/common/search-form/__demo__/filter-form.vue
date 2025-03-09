<template>
	<div class="filter-form-demo">
		<FilterForm :model-value="model" :config="config" />
	</div>
	<h5 style="margin-top: 20px">表单数据模型</h5>
	<pre style="padding: 12px; margin: 12px">{{ model }}</pre>
</template>

<script setup lang="tsx">
import { reactive } from 'vue';
import { FilterForm } from '@erp/biz';
import { config } from './filter-config.tsx';

const model = reactive({
	key1: '',
	key4: [],
	key10: [],
	key11: [],
	key7: [],
	rangeNumber: [],
});
</script>

<style scoped lang="less">
.filter-form-demo {
}
</style>
