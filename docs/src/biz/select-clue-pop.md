# 打开线索选择框

```vue { "component": true }
<template>
	<fk-button type="primary" @click="handleSelect">选择线索</fk-button>
	<p>数据模型</p>
	<fk-row>
		<JsonViewer :data="selected" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { createSelectCluePop } from '@erp/biz';

const selected = ref([]);

const handleSelect = () => {
	createSelectCluePop({ title: '选择线索' }).then(res => {
		console.log('createSelectCluePop >>', res);
		selected.value = res;
	});
};
</script>
```
