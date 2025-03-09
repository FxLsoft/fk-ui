```yaml
title:
  zh-CN: 对话框的宽度
  en-US: Modal width
```


设置 `width="auto"` 可以让对话框自适应宽度

---


```vue { "component": true } 
<template>
  <fk-button @click="handleClick">Open Modal</fk-button>
  <fk-modal v-model:visible="visible" width="auto" @ok="handleOk" @cancel="handleCancel">
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
