## 数据范围输入

```vue
<ErpInput type="range-number" v-model="value" />
<ErpInput v-model="vm.value" multiple type="number" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<p>Number multiple 模式</p>
		<ErpInput v-model="vm.multiple" :placeholder="['最小', '最大']" multiple type="number" />
		<p>通用模式</p>
		<ErpInput v-model="vm.multiple1" :placeholder="['min', 'max']" type="range-number" />
	</div>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const vm = reactive({
	multiple: [],
	multiple1: [1],
});

setTimeout(() => {
	vm.multiple1 = [2, 3];
}, 3000);
</script>

<style lang="scss" scoped>
.erp-input-demo {
	width: 240px;
}
</style>
```
