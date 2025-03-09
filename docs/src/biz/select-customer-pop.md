# 打开选择客户弹窗

```vue { "component": true }
<template>
	<fk-button type="primary" @click="handleSelect">选择客户</fk-button>
	<p>数据模型</p>
	<fk-row>
		<JsonViewer :data="selected" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { createSelectCustomerPop } from '@erp/biz';

const selected = ref([]);

const handleSelect = () => {
	createSelectCustomerPop({ title: '客户选择' }).then(res => {
		console.log('createSelectCustomerPop >>', res);
		selected.value = res;
	});
};
</script>
```
