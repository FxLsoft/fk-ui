# 选择关联商品

```vue { "component": true }
<template>
	<fk-button type="primary" @click="handleSelect">选择关联商品</fk-button>
	<p>数据模型</p>
	<fk-row>
		<JsonViewer :data="selected" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { selectGoodsPop } from '@erp/biz';

const selected = ref([]);

const handleSelect = () => {
	selectGoodsPop({ title: '选择关联商品' }).then(res => {
		console.log('selectGoodsPop >>', res);
		selected.value = res;
	});
};
</script>
```
