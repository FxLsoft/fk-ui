# 上传文件

```vue { "component": true }
<template>
  <fk-space>
    <fk-button type="primary" @click="handleSelect">上传文件(单张)</fk-button>
    <fk-button type="primary" @click="handleMultipleSelect">上传文件(多张)</fk-button>
  </fk-space>
  <p>数据模型</p>
  <JsonViewer :data="selected"/>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { openSelectFile } from '@erp/biz';

const selected = reactive({
  single: null,
  multiple: []
});

const handleSelect = () => {
  openSelectFile({
			accept: 'image', // 
      autoUpload: true,
      // accept: '.gif,.png,.jpg,.jpeg',
		}).then((res) => {
			selected.single = res;
		}).catch(res => {
      selected.single = res;
    });
}

const handleMultipleSelect = () => {
  openSelectFile({
			accept: 'image', // 
      autoUpload: true,
      // accept: '.gif,.png,.jpg,.jpeg',
      multiple: true,
      beforeUpload: () => {
        return Math.random() > 0.5
      }
		}).then((res) => {
			selected.multiple = res;
		}).catch(res => {
      selected.multiple = res;
    });
}

</script>
```
