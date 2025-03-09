```yaml
title:
  zh-CN: 可拖动
  en-US: Draggable
```


开启 `draggable` 属性，允许用户拖动对话框。

---


```vue { "component": true } 
<template>
  <fk-button @click="handleClick">Open Draggable Modal</fk-button>
  <fk-modal v-model:visible="visible" draggable @ok="handleOk" @cancel="handleCancel">
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </fk-modal>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);

    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    }

    return {
      visible,
      handleClick,
      handleOk,
      handleCancel
    }
  },
}
</script>
```
