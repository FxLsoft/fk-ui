```yaml
title:
  zh-CN: 自定义触发元素
  en-US: Customize trigger element
```

自定义触发元素。

---

```vue  { "component": true } 
<template>
  <fk-space>
    <fk-color-picker v-model="value" size="mini" >
      <fk-tag :color="value">
        <template #icon>
          <icon-bg-colors style="color: #fff" />
        </template>
        {{value}}
      </fk-tag>
    </fk-color-picker>
  </fk-space>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('#165DFF');
</script>
```
