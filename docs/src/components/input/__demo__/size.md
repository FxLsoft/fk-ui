```yaml
title:
  zh-CN: 输入框尺寸
  en-US: Input Size
```



输入框定义了四种默认尺寸 `mini, small, medium, large` ，分别为 `24px, 28px, 32px, 36px` 。

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
    <fk-input :style="{width:'320px'}" placeholder="商品衣诚" :size="size" allow-clear />
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
