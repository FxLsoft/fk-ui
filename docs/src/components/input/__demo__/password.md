```yaml
title:
  zh-CN: 密码输入框
  en-US: Password Input
```


用于输入密码。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-switch v-model="visibility" />
    <fk-input-password
      v-model:visibility="visibility"
      placeholder="商品衣诚"
      :style="{width:'320px'}"
      :default-visibility="false"
      allow-clear
    />
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visibility = ref(true);

    return {
      visibility
    }
  },
}
</script>
```
