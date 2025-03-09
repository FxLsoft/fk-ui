# 字典选择输入

```vue { "component": true }
<template>
	<p>单选</p>
	<DicInput v-model="model.single" code="sex_code" placeholder="请选择" />
	<p>多选</p>
	<DicInput v-model="model.multiple" code="sex_code" multiple placeholder="请选择" />
	<p>数据模型</p>
	<fk-row>
		<JsonViewer :data="model" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { DicInput } from '@erp/biz';

const model = ref({
	single: '',
	multiple: [],
});
</script>
```
