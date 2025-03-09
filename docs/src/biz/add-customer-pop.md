# 打开添加客户弹窗

```vue { "component": true }
<template>
	<fk-space>
		<fk-button type="primary" @click="handleSelect">添加客户</fk-button>
		<fk-button type="primary" @click="handleEditSelect">编辑客户</fk-button>
	</fk-space>
	<p>数据模型</p>
	<fk-row>
		<JsonViewer :data="selected" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { createAddCustomerPop } from '@erp/biz';

const selected = ref([]);

const handleSelect = () => {
	createAddCustomerPop({ bizType: 'add' }).then(res => {
		console.log('createAddCustomerPop >>', res);
		selected.value = res;
	});
};

const handleEditSelect = () => {
	createAddCustomerPop({ bizType: 'edit', bizId: 487987 }).then(res => {
		console.log('createAddCustomerPop >>', res);
		selected.value = res;
	});
};
</script>
```
