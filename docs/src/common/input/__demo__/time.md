## 时间选择输入

时间选择

```vue
<ErpInput type="time" v-model="value" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<h5>单选</h5>
		<ErpInput v-model="vm.value" type="time" />
		<h5>范围选择</h5>
		<ErpInput v-model="vm.values" type="time" multiple />
	</div>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const vm = reactive({
	value: '',
	values: [],
});
</script>

<style lang="scss" scoped>
.erp-input-demo {
	width: 240px;
	h5 {
		font-size: 14px;
		margin: 12px 0 6px;
	}
}
</style>
```
