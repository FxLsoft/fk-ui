```yaml
title:
  zh-CN: 触发器
  en-US: Trigger
```

可以通过 `trigger-props` 设置触发器的所有属性。

---

```vue  { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-switch v-model="triggerProps.popupVisible">
      <template #checked> ON </template>
      <template #unchecked>OFF</template>
    </fk-switch>
    <fk-color-picker default-value="#165DFF" :trigger-props="triggerProps" />
  </fk-space>
</template>

<script setup>
import { ref } from 'vue';

const triggerProps = ref({
  popupVisible: false,
  unmountOnClose: true,
  position: 'rt'
})
</script>
```
