## 搜索框输入

```vue
<ErpInput v-model="vm.value" type="search-input" />
<ErpInput v-model="vm.value1" type="search-input" search-button />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<p>搜索图标</p>
		<ErpInput v-model="vm.value" type="search-input" @search="onSearch" />
		<p>搜索button</p>
		<ErpInput v-model="vm.value1" type="search-input" search-button loading @search="onSearch"/>
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
