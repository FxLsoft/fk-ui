## 开关输入

开关选择

```vue
<ErpInput type="switch" v-model="value" :options="options" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<ErpInput v-model="vm.value" type="switch" :options="options" />
	</div>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const vm = reactive({
	value: 1,
});

const options = [
	{
		label: '开',
		value: 1,
	},
	{
		label: '关',
		value: 2,
	},
];
</script>

<style lang="scss" scoped>
.erp-input-demo {
	// width: 240px;
}
</style>
```
