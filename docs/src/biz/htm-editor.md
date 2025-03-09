# 富文本输入

```vue { "component": true }
<template>
	<h2>编辑状态</h2>
	<HTMLEditor v-model="model.single" />
	<fk-row>
		<JsonViewer :data="model" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { HTMLEditor } from '@erp/biz';

const model = ref({
	single: ``,
	multiple: [],
});
</script>
```
