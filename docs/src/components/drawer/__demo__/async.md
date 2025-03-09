```yaml
title:
  zh-CN: 异步关闭
  en-US: Async Close
```


$END$

---


```vue { "component": true } 
<template>
  <fk-button @click="handleClick">Open Drawer</fk-button>
  <fk-drawer v-model:visible="visible" unmount-on-close @before-ok="handleBeforeOk" @cancel="handleCancel">
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </fk-drawer>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false)

const handleClick = () => {
  visible.value = true;
}

const handleBeforeOk = (done) => {
  window.setTimeout(() => {
    done()
  }, 3000)
}

const handleCancel = () => {
  visible.value = false;
}
</script>
```
