# 商品分类输入


```vue { "component": true }
<template>
  <p>单选</p>
  <GoodsCategoryInput v-model="model.single" placeholder="商品分类" />
  <p>多选 </p>
  <GoodsCategoryInput v-model="model.multiple" multiple placeholder="商品分类" />
  <p>数据模型</p>
  <fk-row>
		<JsonViewer :data="model" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { GoodsCategoryInput } from '@erp/biz';

const model = ref({
  single: '',
  multiple: [],
});


</script>
```
