## 批量输入

```vue
<ErpInput v-model="vm.value" type="batch-input" />
<ErpInput v-model="vm.value1" type="batch-input" disabled />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<p>默认模式</p>
		<ErpInput v-model="vm.value" placeholder="回车或双击进行批量输入" name="商品编号" type="batch-input" />
		<p>默认模式 <code>disabled</code></p>
		<ErpInput v-model="vm.value" placeholder="批量输入" type="batch-input" disabled/>
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
	value1: '',
});

/**
 * 单击搜索按钮时触发
 */
const onSearch = () => {
    console.log('onSearch')
}

</script>

<style lang="scss" scoped>
.erp-input-demo {
	width: 240px;
}
</style>
```
