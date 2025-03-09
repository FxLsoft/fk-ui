```yaml
title:
  zh-CN: 分页尺寸
  en-US: Pagination Size
```


分页分为 `mini`、`small`、`medium`、`large` 四种尺寸。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-radio-group v-model="size" type="button">
      <fk-radio value="mini">Mini</fk-radio>
      <fk-radio value="small">Small</fk-radio>
      <fk-radio value="medium">Medium</fk-radio>
      <fk-radio value="large">Large</fk-radio>
    </fk-radio-group>
    <fk-pagination :total="50" :size="size" show-total show-jumper show-page-size />
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
