## 整数输入

仅可输入大于 0 的整数

```vue
<ErpInput type="integer" v-model="value" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<ErpInput v-model="vm.value" type="integer" @change="handleChange" />
	</div>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const handleChange = value => {
	console.log('handleChange >>', value);
};

const vm = reactive({
	value: '',
});
</script>

<style lang="scss" scoped>
.erp-input-demo {
	width: 240px;
}
</style>
```
