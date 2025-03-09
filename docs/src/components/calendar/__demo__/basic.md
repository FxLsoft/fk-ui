```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


展示和选择日历

---


```vue { "component": true } 

<template>
  <fk-calendar v-model="value" />
  select: {{value}}
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(new Date('2023-01-01'));

    return {
      value
    }
  },
}
</script>
```
