```yaml
title:
  zh-CN: 嵌套抽屉
  en-US: Nested
```


在抽屉内打开新的抽屉。

---


```vue { "component": true } 
<template>
  <fk-button type="primary" @click="handleClick">Open Drawer</fk-button>
  <fk-drawer :visible="visible" :width="500" unmount-on-close @ok="handleOk" @cancel="handleCancel">
    <template #title>
      Title
    </template>
    <div :style="{marginBottom: '20px'}">You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
    <fk-button type="primary" @click="handleNestedClick">Open Nested Drawer</fk-button>
  </fk-drawer>
  <fk-drawer :visible="nestedVisible" unmount-on-close @ok="handleNestedOk" @cancel="handleNestedCancel">
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </fk-drawer>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);
    const nestedVisible = ref(false);

    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    }
    const handleNestedClick = () => {
      nestedVisible.value = true;
    };
    const handleNestedOk = () => {
      nestedVisible.value = false;
    };
    const handleNestedCancel = () => {
      nestedVisible.value = false;
    }

    return {
      visible,
      nestedVisible,
      handleClick,
      handleOk,
      handleCancel,
      handleNestedClick,
      handleNestedOk,
      handleNestedCancel
    }
  },
};
</script>
```
