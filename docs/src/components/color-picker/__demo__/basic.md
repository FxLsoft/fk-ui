```yaml
title:
  zh-CN: 基本使用
```

基本用法

---

```vue  { "component": true } 
<template>
  <fk-space>
    <fk-color-picker  v-model="value" />
    <fk-color-picker default-value="#165DFF" show-text disabled-alpha/>
  </fk-space>
</template>

<script setup>
import { ref } from 'vue';
const value = ref('#165DFF')
</script>
```
