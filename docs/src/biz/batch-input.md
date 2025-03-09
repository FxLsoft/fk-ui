# 批量输入弹窗

```vue { "component": true }
<template>
	<fk-space align="start" direction="vertical">
		<fk-space align="start">
			<fk-button type="primary" @click="handleOpen">打开批量输入弹窗</fk-button>
		</fk-space>
	</fk-space>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { createBatchInputPop } from '@erp/biz';

const vm = reactive({
    input: {}
});

const handleOpen = () => {
    createBatchInputPop({
        bizName: '商品款号',
    }).then(res => {
        vm.input = res;
    })
}
</script>
```
