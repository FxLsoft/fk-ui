```yaml
title:
  zh-CN: 异步关闭
  en-US: Async Close
```


可以通过 on-before-ok 更简洁的实现异步关闭功能

---


```vue { "component": true } 

<template>
  <fk-button @click="handleClick">Open Modal</fk-button>
  <fk-modal v-model:visible="visible" :on-before-ok="handleBeforeOk" unmount-on-close @cancel="handleCancel">
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you
      press the OK button.
    </div>
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
    const handleBeforeOk = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      return true;
      // prevent close
      // return false;
    };
    const handleCancel = () => {
      visible.value = false;
    }

    return {
      visible,
      handleClick,
      handleBeforeOk,
      handleCancel
    }
  },
}
</script>
```
