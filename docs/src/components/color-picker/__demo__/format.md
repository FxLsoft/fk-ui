```yaml
title:
  zh-CN: 颜色格式
```

通过 `format` 设置颜色值的格式，支持 `hex` 和 `rgb`。

---

```vue  { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-radio-group v-model="format" type="button">
      <fk-radio v-for="item in formatList" :key="item" :value="item">{{item}}</fk-radio>
    </fk-radio-group>
    <fk-color-picker default-value="#165DFF" :format="format" show-text />
  </fk-space>
</template>

<script setup>
import { ref } from 'vue';

const format = ref('hex')
const formatList = ['hex', 'rgb']
</script>
```
