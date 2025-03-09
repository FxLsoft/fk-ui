## 字典选择输入

```vue { "component": true }
<template>
	<p>单选</p>
	<ErpInput v-model="model.single" code="sex_code" type="dic" placeholder="请选择" />
	<p>多选</p>
	<ErpInput v-model="model.multiple" code="unit" type="dic" multiple placeholder="请选择" />
	<p>数据模型</p>
	<fk-row>
		<JsonViewer :data="model" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const model = ref({
	single: '',
	multiple: [],
});
</script>
```
