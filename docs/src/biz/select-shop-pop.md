# 选择店铺

```vue { "component": true }
<template>
	<fk-space>
		<fk-button type="primary" @click="handleSelect">选择店铺(多选)</fk-button>
		<fk-button type="primary" @click="handleSingleSelect">选择店铺(单选)</fk-button>
	</fk-space>
	<fk-row>
		<JsonViewer :data="result" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { selectShopPop } from '@erp/biz';
import data from '/biz/shop.json';

const result = ref({});

const handleSelect = () => {
	selectShopPop({ ids: [93], options: cloneDeep(data.data) }).then(res => {
		result.value = res;
	});
};

const handleSingleSelect = () => {
	selectShopPop({ ids: [93], options: cloneDeep(data.data), multiple: false }).then(res => {
		result.value = res;
	});
};
</script>
```
