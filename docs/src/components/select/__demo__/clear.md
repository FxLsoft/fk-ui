```yaml
title:
  zh-CN: 允许清除
  en-US: Allow Clear
```


通过设置 `allow-clear` ，显示清除按钮。

---


```vue { "component": true } 

<template>
  <fk-select v-model="value" :style="{width:'320px'}" placeholder="Please select ..." allow-clear>
    <fk-option>Beijing</fk-option>
    <fk-option>Shanghai</fk-option>
    <fk-option>Guangzhou</fk-option>
    <fk-option disabled>Disabled</fk-option>
  </fk-select>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref('Shanghai');
    return {
      value
    }
  },
}
</script>
```
