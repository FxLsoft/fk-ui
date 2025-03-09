# Excel批量导入

```vue { "component": true }
<template>
	<fk-space>
		<fk-button type="primary" @click="handleSelect">批量导入</fk-button>
	</fk-space>
	<p>数据模型</p>
	<fk-row>
		<JsonViewer :data="selected" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { createImportExcelPop } from '@erp/biz';

const selected = ref([]);

const handleSelect = () => {
	createImportExcelPop({
		bizName: '订单及开票信息',
		tips: '提示:批量导入仅限订单拆分开票',
		downloadUrl: 'https://static.erp.91spyc.com/default/OgQYJrhASUsaOv9Z7ijzOyvMtOtILR9SSyC2PVtb.xlsx',
        uploadTips: '谁防雷接地',
		beforeConfirm: async file => {
			return true;
		},
	}).then(res => {
		console.log('createImportExcelPop >>', res);
		selected.value = res;
	});
};
</script>
```
