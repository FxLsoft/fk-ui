```yaml
title:
  zh-CN: 全屏
  en-US: Fullscreen
```


开启 `fullscreen` 属性，可以让对话框占满整个容器。

---


```vue { "component": true } 
<template>
  <fk-button @click="handleClick">Open Modal</fk-button>
  <fk-modal v-model:visible="visible" fullscreen @ok="handleOk" @cancel="handleCancel">
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
