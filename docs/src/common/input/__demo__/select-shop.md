## 店铺选择输入

```vue
<ErpInput type="select-shop" v-model="value" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
        <p>多选</p>
		<ErpInput v-model="vm.select" placeholder="店铺选择" :multiple="true" type="select-shop" />
	</div>
    <div class="erp-input-demo">
        <p>单选</p>
		<ErpInput v-model="vm.single" placeholder="店铺选择" :multiple="false" type="select-shop" />
	</div>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const vm = reactive({
	select: [208],
    single: 208,
});
</script>

<style lang="scss" scoped>
.erp-input-demo {
	width: 240px;
}
</style>
```
