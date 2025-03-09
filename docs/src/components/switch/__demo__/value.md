```yaml
title:
  zh-CN: 自定义开关的值
  en-US: Custom Value
```


通过 `checked-value` 和 `unchecked-value` 可以自定义开关的值。

---


```vue { "component": true } 

<template>
  <fk-space direction="vertical" size="large">
    <fk-switch v-model="value" checked-value="yes" unchecked-value="no" />
    <div>Current Value: {{ value }}</div>
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref('');

    return {
      value
    }
  },
}
</script>
```
