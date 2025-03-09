```yaml
title:
  zh-CN: 定制按钮文字
  en-US: Custom Button Text
```


设置 `okText` 与 `cancelText` 可以自定义按钮文字。

---


```vue { "component": true } 
<template>
  <fk-button @click="handleClick">Open Modal</fk-button>
  <fk-modal :visible="visible" ok-text="Confirm" cancel-text="Exit" unmount-on-close @ok="handleOk" @cancel="handleCancel">
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
