## HTML富文本输入

```vue { "component": true }
<template>
	<h3>编辑状态</h3>
	<ErpInput v-model="model.single" type="html-input" />
	<h3>查看状态</h3>
	<ErpInput v-model="model.multiple" type="html-input" disabled />
	<fk-row>
		<JsonViewer :data="model" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const model = ref({
	single: '',
	multiple: 'aaadf',
});
</script>
```
