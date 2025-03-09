## 单项选择输入

单项选择

```vue
<ErpInput type="radio" v-model="value" :options="options" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<ErpInput v-model="vm.value" type="radio" :options="checkboxOptions" />
	</div>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const vm = reactive({
	value: 5,
});

const checkboxOptions = [
	{
		label: '未选中项',
		value: 1,
	},
	{
		label: '未选悬停项',
		value: 2,
	},
	{
		label: '选中项',
		value: 3,
	},
	{
		label: '未选禁用项',
		value: 4,
	},
	{
		label: '选中禁用项',
		value: 5,
		disabled: true,
	},
];
</script>

<style lang="scss" scoped>
.erp-input-demo {
	// width: 240px;
}
</style>
```
