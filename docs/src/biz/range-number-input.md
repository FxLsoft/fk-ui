# 数字范围输入

```vue { "component": true }
<template>
	<p>数字范围输入组件</p>
	<RangeNumberInput v-model="model.multiple" multiple :placeholder="['min', 'max']" allow-clear />
	<p>数字范围输入组件 disabled 状态</p>
	<RangeNumberInput v-model="model.multiple1" disabled multiple :placeholder="['min', 'max']" />
	<p>数据模型</p>
	<fk-row>
		<JsonViewer :data="model" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RangeNumberInput } from '@erp/biz';

const model = ref({
	multiple: [],
	multiple1: [1],
});

setTimeout(() => {
	model.value.multiple1 = [2, 3];
}, 3000);
</script>
<style lang="less" scoped>
:deep(.range-number) {
	width: 220px;
}
</style>
```
