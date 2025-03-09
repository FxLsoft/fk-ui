## 密码输入

```vue
<ErpInput type="text" v-model="value" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<ErpInput v-model="vm.text" type="password" @change="handleChange" />
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
	text: '',
});
</script>

<style lang="scss" scoped>
.erp-input-demo {
	width: 240px;
}
</style>
```
