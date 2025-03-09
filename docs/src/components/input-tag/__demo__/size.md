```yaml
title:
  zh-CN: 输入框尺寸
  en-US: Input Size
```


输入框分为 `mini`、`small`、`medium`、`large` 四种尺寸。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-radio-group v-model="size" type="button">
      <fk-radio value="mini">mini</fk-radio>
      <fk-radio value="small">small</fk-radio>
      <fk-radio value="medium">medium</fk-radio>
      <fk-radio value="large">large</fk-radio>
    </fk-radio-group>
    <fk-input-tag :default-value="['one']" :style="{width:'320px'}" placeholder="商品衣诚" :size="size" allow-clear />
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const size = ref('medium');

    return {
      size
    }
  },
}
</script>
```
