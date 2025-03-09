# 打开添加商品弹窗


```vue { "component": true }
<template>
  <fk-button type="primary" @click="handleSelect">添加商品</fk-button>
  <p>数据模型</p>
  <fk-row>
		<JsonViewer :data="selected" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { createAddGoodsPop } from '@erp/biz';

const selected = ref([]);

const handleSelect = () => {
  createAddGoodsPop({title: '添加商品'}).then(res => {
    console.log('createAddGoodsPop >>', res);
    selected.value = res;
  })
}

</script>
```
