## 数据输入

```vue
<ErpInput type="number" v-model="value" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<ErpInput v-model="vm.value" type="number" />
	</div>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const vm = reactive({
	value: '',
	multiple: [],
});
</script>

<style lang="scss" scoped>
.erp-input-demo {
	width: 240px;
}
</style>
```
