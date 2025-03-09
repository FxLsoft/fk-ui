## 文本域输入

```vue
<ErpInput type="textarea" v-model="value" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<ErpInput v-model="vm.text" type="textarea" />
	</div>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const vm = reactive({
	text: '',
});
</script>

<style lang="scss" scoped>
.erp-input-demo {
	width: 240px;
}
</style>
```
